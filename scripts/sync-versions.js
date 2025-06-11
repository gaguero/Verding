#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Synchronize package versions across the monorepo
 * Usage: node scripts/sync-versions.js [patch|minor|major]
 */

const versionType = process.argv[2] || 'patch';
const validVersionTypes = ['patch', 'minor', 'major'];

if (!validVersionTypes.includes(versionType)) {
  console.error(`Invalid version type: ${versionType}`);
  console.error(`Valid types: ${validVersionTypes.join(', ')}`);
  process.exit(1);
}

// Read root package.json to get current version
const rootPackagePath = path.join(__dirname, '..', 'package.json');
const rootPackage = JSON.parse(fs.readFileSync(rootPackagePath, 'utf8'));

console.log(`Current version: ${rootPackage.version}`);

// Calculate new version
const currentVersion = rootPackage.version.split('.').map(Number);
let newVersion;

switch (versionType) {
  case 'major':
    newVersion = [currentVersion[0] + 1, 0, 0];
    break;
  case 'minor':
    newVersion = [currentVersion[0], currentVersion[1] + 1, 0];
    break;
  case 'patch':
  default:
    newVersion = [currentVersion[0], currentVersion[1], currentVersion[2] + 1];
    break;
}

const newVersionString = newVersion.join('.');
console.log(`New version: ${newVersionString}`);

// Find all package.json files in packages/
const packagesDir = path.join(__dirname, '..', 'packages');
const packages = fs.readdirSync(packagesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log(`Updating ${packages.length} packages...`);

// Update each package
packages.forEach(packageName => {
  const packagePath = path.join(packagesDir, packageName, 'package.json');
  
  if (fs.existsSync(packagePath)) {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    packageJson.version = newVersionString;
    
    // Update internal workspace dependencies to match new version
    ['dependencies', 'devDependencies', 'peerDependencies'].forEach(depType => {
      if (packageJson[depType]) {
        Object.keys(packageJson[depType]).forEach(dep => {
          if (dep.startsWith('@verding/') && packageJson[depType][dep] === '*') {
            // Keep workspace:* pattern for development
            packageJson[depType][dep] = 'workspace:*';
          }
        });
      }
    });
    
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`✓ Updated ${packageName} to ${newVersionString}`);
  } else {
    console.warn(`⚠ Package ${packageName} does not have package.json`);
  }
});

// Update root package.json
rootPackage.version = newVersionString;
fs.writeFileSync(rootPackagePath, JSON.stringify(rootPackage, null, 2) + '\n');
console.log(`✓ Updated root package to ${newVersionString}`);

console.log('\n✅ Version synchronization complete!');
console.log(`All packages are now at version ${newVersionString}`); 
