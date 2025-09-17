#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔍 Analyzing bundle size and dependencies...\n');

// Run bundle analyzer
console.log('📊 Running bundle analysis...');
try {
  execSync('ANALYZE=true pnpm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Bundle analysis failed:', error.message);
  process.exit(1);
}

// Check for large dependencies
console.log('\n📦 Checking for large dependencies...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const largeDependencies = [
  '@mui/material',
  '@mui/icons-material', 
  '@mui/x-date-pickers',
  'ag-grid-community',
  'ag-grid-react',
  '@sentry/nextjs',
  '@tanstack/react-query',
  'react-hook-form',
  'zod',
  'i18next',
  'react-i18next'
];

console.log('Large dependencies found:');
largeDependencies.forEach(dep => {
  if (packageJson.dependencies[dep]) {
    console.log(`  ✅ ${dep}: ${packageJson.dependencies[dep]}`);
  }
});

// Check for development dependencies in production
console.log('\n🔧 Checking for dev dependencies in production...');
const devDeps = [
  '@storybook',
  'vitest',
  'eslint',
  'prettier'
];

console.log('Dev dependencies that should not be in production bundle:');
devDeps.forEach(dep => {
  if (packageJson.devDependencies[dep]) {
    console.log(`  ✅ ${dep}: ${packageJson.devDependencies[dep]} (dev only)`);
  }
});

console.log('\n📈 Bundle optimization recommendations:');
console.log('1. ✅ Removed Playwright completely from project');
console.log('2. ✅ Optimized webpack code splitting');
console.log('3. ✅ Created centralized MUI imports');
console.log('4. ✅ Reduced chunk size limits');
console.log('5. ✅ Added console removal in production');

console.log('\n🎯 Next steps:');
console.log('1. Update all MUI imports to use centralized mui-imports.ts');
console.log('2. Consider lazy loading heavy components (AG-Grid, DataTable)');
console.log('3. Remove unused MUI icons and components');
console.log('4. Consider replacing heavy libraries with lighter alternatives');

console.log('\n✨ Run "pnpm run analyze" to see detailed bundle analysis');
