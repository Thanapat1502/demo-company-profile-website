/**
 * Migration script to populate web_labels table with existing translations
 * Run this script to migrate from JSON files to Supabase
 * 
 * Usage: node scripts/migrate-translations.js
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Convert nested object to flat keys
 * Example: { home: { title: "Welcome" } } → { "home.title": "Welcome" }
 */
function nestedToFlat(obj, prefix = '') {
  const flat = {};
  
  Object.keys(obj).forEach(key => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(flat, nestedToFlat(obj[key], newKey));
    } else {
      flat[newKey] = obj[key];
    }
  });
  
  return flat;
}

/**
 * Load translations from JSON file
 */
function loadTranslations(locale) {
  const filePath = path.join(__dirname, '..', 'messages', `${locale}.json`);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`Translation file not found: ${filePath}`);
    return {};
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const translations = JSON.parse(content);
    return nestedToFlat(translations);
  } catch (error) {
    console.error(`Error loading translations from ${filePath}:`, error);
    return {};
  }
}

/**
 * Insert translations into Supabase
 */
async function insertTranslations(locale, translations) {
  const labels = Object.entries(translations).map(([key, value]) => ({
    key,
    value: String(value),
    locale,
    description: `Migrated from ${locale}.json`
  }));
  
  console.log(`Inserting ${labels.length} translations for locale ${locale}...`);
  
  // Insert in batches to avoid hitting limits
  const batchSize = 100;
  let inserted = 0;
  let errors = 0;
  
  for (let i = 0; i < labels.length; i += batchSize) {
    const batch = labels.slice(i, i + batchSize);
    
    const { data, error } = await supabase
      .from('web_labels')
      .upsert(batch, { 
        onConflict: 'key,locale',
        ignoreDuplicates: false 
      });
    
    if (error) {
      console.error(`Error inserting batch ${Math.floor(i / batchSize) + 1}:`, error);
      errors += batch.length;
    } else {
      inserted += batch.length;
      console.log(`✓ Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(labels.length / batchSize)}`);
    }
  }
  
  return { inserted, errors };
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('🚀 Starting translation migration...\n');
  
  const locales = ['en', 'th'];
  let totalInserted = 0;
  let totalErrors = 0;
  
  for (const locale of locales) {
    console.log(`📝 Processing locale: ${locale}`);
    
    const translations = loadTranslations(locale);
    const translationCount = Object.keys(translations).length;
    
    if (translationCount === 0) {
      console.log(`⚠️  No translations found for ${locale}, skipping...\n`);
      continue;
    }
    
    console.log(`Found ${translationCount} translations for ${locale}`);
    
    const { inserted, errors } = await insertTranslations(locale, translations);
    totalInserted += inserted;
    totalErrors += errors;
    
    console.log(`✅ Completed ${locale}: ${inserted} inserted, ${errors} errors\n`);
  }
  
  console.log('🎉 Migration completed!');
  console.log(`📊 Summary:`);
  console.log(`   - Total inserted: ${totalInserted}`);
  console.log(`   - Total errors: ${totalErrors}`);
  
  if (totalErrors > 0) {
    console.log('\n⚠️  Some translations failed to insert. Check the errors above.');
    process.exit(1);
  }
}

// Run migration
migrate().catch(error => {
  console.error('💥 Migration failed:', error);
  process.exit(1);
});
