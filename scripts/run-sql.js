/**
 * Script to run SQL files against Supabase
 * Usage: node scripts/run-sql.js <sql-file-path>
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

// Get SQL file path from command line arguments
const sqlFilePath = process.argv[2];

if (!sqlFilePath) {
  console.error('Usage: node scripts/run-sql.js <sql-file-path>');
  process.exit(1);
}

// Check if file exists
if (!fs.existsSync(sqlFilePath)) {
  console.error(`SQL file not found: ${sqlFilePath}`);
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runSQL() {
  try {
    console.log(`🚀 Running SQL file: ${sqlFilePath}`);
    
    // Read SQL file
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Execute SQL
    const { data, error } = await supabase.rpc('exec_sql', {
      sql_query: sqlContent
    });
    
    if (error) {
      console.error('❌ Error executing SQL:', error);
      process.exit(1);
    }
    
    console.log('✅ SQL executed successfully!');
    if (data) {
      console.log('📊 Result:', data);
    }
    
  } catch (error) {
    console.error('💥 Script failed:', error);
    process.exit(1);
  }
}

// Run the script
runSQL();
