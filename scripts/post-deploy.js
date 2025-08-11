#!/usr/bin/env node

/**
 * Post-deployment script to warm cache and verify deployment
 * Run this after Vercel deployment to ensure optimal cache performance
 */

const https = require('https');
const http = require('http');

const DEPLOYMENT_URL = process.env.VERCEL_URL || process.env.DEPLOYMENT_URL;
const CACHE_WARM_SECRET = process.env.CACHE_WARM_SECRET;

if (!DEPLOYMENT_URL) {
  console.error('❌ DEPLOYMENT_URL or VERCEL_URL environment variable is required');
  process.exit(1);
}

if (!CACHE_WARM_SECRET) {
  console.error('❌ CACHE_WARM_SECRET environment variable is required');
  process.exit(1);
}

const baseUrl = DEPLOYMENT_URL.startsWith('http') 
  ? DEPLOYMENT_URL 
  : `https://${DEPLOYMENT_URL}`;

console.log(`🚀 Starting post-deployment tasks for: ${baseUrl}`);

/**
 * Make HTTP request with promise
 */
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https:') ? https : http;
    
    const req = lib.request(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Post-Deploy-Script/1.0',
        ...options.headers,
      },
      timeout: 30000,
      ...options,
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: data,
        });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

/**
 * Verify deployment health
 */
async function verifyDeployment() {
  console.log('🔍 Verifying deployment health...');
  
  const healthChecks = [
    { name: 'Thai Homepage', url: `${baseUrl}/th` },
    { name: 'English Homepage', url: `${baseUrl}/en` },
    { name: 'Services API', url: `${baseUrl}/api/services` },
    { name: 'Products API', url: `${baseUrl}/api/products` },
  ];

  const results = [];
  
  for (const check of healthChecks) {
    try {
      console.log(`  Checking ${check.name}...`);
      const response = await makeRequest(check.url);
      
      if (response.status === 200) {
        console.log(`  ✅ ${check.name}: OK (${response.status})`);
        results.push({ ...check, status: 'OK', code: response.status });
      } else {
        console.log(`  ⚠️  ${check.name}: ${response.status}`);
        results.push({ ...check, status: 'WARNING', code: response.status });
      }
    } catch (error) {
      console.log(`  ❌ ${check.name}: ${error.message}`);
      results.push({ ...check, status: 'ERROR', error: error.message });
    }
  }

  return results;
}

/**
 * Warm cache for critical pages
 */
async function warmCache() {
  console.log('🔥 Warming cache...');
  
  try {
    const response = await makeRequest(`${baseUrl}/api/cache-warm`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CACHE_WARM_SECRET}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const data = JSON.parse(response.data);
      console.log('✅ Cache warming completed successfully');
      console.log(`   Total URLs: ${data.summary.total}`);
      console.log(`   Successful: ${data.summary.successful}`);
      console.log(`   Cache Hit Rate: ${data.summary.cacheHitRate}`);
      
      return data;
    } else {
      console.log(`⚠️  Cache warming returned status: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.log(`❌ Cache warming failed: ${error.message}`);
    return null;
  }
}

/**
 * Test locale-specific caching
 */
async function testLocaleCaching() {
  console.log('🌐 Testing locale-specific caching...');
  
  const testUrls = [
    { locale: 'th', url: `${baseUrl}/th` },
    { locale: 'en', url: `${baseUrl}/en` },
    { locale: 'th', url: `${baseUrl}/th/pds-group` },
    { locale: 'en', url: `${baseUrl}/en/pds-group` },
  ];

  const results = [];

  for (const test of testUrls) {
    try {
      console.log(`  Testing ${test.locale} cache: ${test.url}`);
      
      // First request to populate cache
      await makeRequest(test.url, {
        headers: {
          'Accept-Language': test.locale === 'th' ? 'th,en;q=0.9' : 'en,th;q=0.9',
        },
      });

      // Second request to test cache
      const response = await makeRequest(test.url, {
        headers: {
          'Accept-Language': test.locale === 'th' ? 'th,en;q=0.9' : 'en,th;q=0.9',
        },
      });

      const cacheStatus = response.headers['x-vercel-cache'] || 'UNKNOWN';
      const locale = response.headers['x-locale'] || 'UNKNOWN';
      
      console.log(`  📊 ${test.locale}: Cache=${cacheStatus}, Locale=${locale}`);
      results.push({
        locale: test.locale,
        url: test.url,
        cacheStatus,
        detectedLocale: locale,
        success: response.status === 200,
      });

    } catch (error) {
      console.log(`  ❌ ${test.locale}: ${error.message}`);
      results.push({
        locale: test.locale,
        url: test.url,
        error: error.message,
        success: false,
      });
    }
  }

  return results;
}

/**
 * Main execution
 */
async function main() {
  console.log('🎯 Post-deployment optimization started\n');

  // Step 1: Verify deployment
  const healthResults = await verifyDeployment();
  const healthyChecks = healthResults.filter(r => r.status === 'OK').length;
  
  if (healthyChecks === 0) {
    console.log('\n❌ Deployment verification failed. Aborting cache optimization.');
    process.exit(1);
  }

  console.log(`\n✅ Deployment verification: ${healthyChecks}/${healthResults.length} checks passed\n`);

  // Step 2: Warm cache
  const cacheResults = await warmCache();
  
  // Step 3: Test locale caching
  console.log('');
  const localeResults = await testLocaleCaching();

  // Summary
  console.log('\n📊 Post-deployment Summary:');
  console.log('================================');
  console.log(`Health Checks: ${healthyChecks}/${healthResults.length} passed`);
  console.log(`Cache Warming: ${cacheResults ? 'Success' : 'Failed'}`);
  console.log(`Locale Tests: ${localeResults.filter(r => r.success).length}/${localeResults.length} passed`);
  
  if (cacheResults) {
    console.log(`Cache Hit Rate: ${cacheResults.summary.cacheHitRate}`);
  }

  console.log('\n🎉 Post-deployment optimization completed!');
}

// Run the script
main().catch(error => {
  console.error('\n💥 Post-deployment script failed:', error);
  process.exit(1);
});
