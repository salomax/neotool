#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🧪 Testing bundle size improvements...\n');

try {
  // Check if .next directory exists
  if (!fs.existsSync('.next')) {
    console.log('❌ .next directory not found. Please run "npm run dev" first.');
    process.exit(1);
  }

  // Look for bundle analysis files
  const analyzeDir = '.next/analyze';
  if (fs.existsSync(analyzeDir)) {
    console.log('📊 Bundle analysis files found:');
    const files = fs.readdirSync(analyzeDir);
    files.forEach(file => {
      if (file.endsWith('.html')) {
        console.log(`  ✅ ${file}`);
      }
    });
  }

  // Check for large chunks in .next/static
  const staticDir = '.next/static';
  if (fs.existsSync(staticDir)) {
    console.log('\n📦 Checking static chunks...');
    
    const findLargeFiles = (dir, maxSize = 500000) => { // 500KB
      const files = fs.readdirSync(dir, { withFileTypes: true });
      const largeFiles = [];
      
      files.forEach(file => {
        const fullPath = `${dir}/${file.name}`;
        if (file.isDirectory()) {
          largeFiles.push(...findLargeFiles(fullPath, maxSize));
        } else if (file.isFile() && file.name.endsWith('.js')) {
          const stats = fs.statSync(fullPath);
          if (stats.size > maxSize) {
            largeFiles.push({
              path: fullPath,
              size: stats.size,
              sizeKB: Math.round(stats.size / 1024)
            });
          }
        }
      });
      
      return largeFiles;
    };
    
    const largeFiles = findLargeFiles(staticDir);
    
    if (largeFiles.length === 0) {
      console.log('✅ No large JavaScript files found (all under 500KB)');
    } else {
      console.log('⚠️  Large JavaScript files found:');
      largeFiles.forEach(file => {
        console.log(`  📄 ${file.path}: ${file.sizeKB}KB`);
      });
    }
  }

  // Check for OpenTelemetry and Playwright in chunks
  console.log('\n🔍 Checking for excluded dependencies...');
  
  const checkForExcludedDeps = (dir) => {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    let foundExcluded = [];
    
    files.forEach(file => {
      const fullPath = `${dir}/${file.name}`;
      if (file.isDirectory()) {
        foundExcluded.push(...checkForExcludedDeps(fullPath));
      } else if (file.isFile() && file.name.endsWith('.js')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('@opentelemetry') || content.includes('playwright')) {
          foundExcluded.push(fullPath);
        }
      }
    });
    
    return foundExcluded;
  };
  
  const excludedDeps = checkForExcludedDeps(staticDir);
  
  if (excludedDeps.length === 0) {
    console.log('✅ No OpenTelemetry or Playwright found in client bundles');
  } else {
    console.log('⚠️  Found excluded dependencies in:');
    excludedDeps.forEach(file => {
      console.log(`  📄 ${file}`);
    });
  }

  console.log('\n🎉 Bundle size test completed!');
  console.log('\n💡 To see detailed analysis, run: npm run analyze');

} catch (error) {
  console.error('❌ Error testing bundle size:', error.message);
  process.exit(1);
}
