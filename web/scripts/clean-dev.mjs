#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🧹 Cleaning development cache and restarting...\n');

try {
  // Remove .next directory
  if (fs.existsSync('.next')) {
    console.log('🗑️  Removing .next directory...');
    fs.rmSync('.next', { recursive: true, force: true });
  }

  // Remove node_modules/.cache if it exists
  const cacheDir = path.join('node_modules', '.cache');
  if (fs.existsSync(cacheDir)) {
    console.log('🗑️  Removing node_modules/.cache...');
    fs.rmSync(cacheDir, { recursive: true, force: true });
  }

  console.log('✅ Cache cleaned successfully!');
  console.log('🚀 Starting development server with optimized configuration...\n');

  // Start the development server
  execSync('next dev', { stdio: 'inherit' });

} catch (error) {
  console.error('❌ Error cleaning cache:', error.message);
  process.exit(1);
}
