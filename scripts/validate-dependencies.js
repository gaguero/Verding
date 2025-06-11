#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Validate workspace dependencies to prevent version conflicts
 * Usage: node scripts/validate-dependencies.js
 */

console.log('🔍 Validating workspace dependencies...\n');

// Read root package.json
const rootPackagePath = path.join(__dirname, '..', 'package.json');
const rootPackage = JSON.parse(fs.readFileSync(rootPackagePath, 'utf8'));

// Find all packages
const packagesDir = path.join(__dirname, '..', 'packages');
const packages = fs.readdirSync(packagesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

const packageDetails = {};
const dependencyVersions = {};
const issues = [];

// Collect package information
packages.forEach(packageName => {
  const packagePath = path.join(packagesDir, packageName, 'package.json');
  
  if (fs.existsSync(packagePath)) {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    packageDetails[packageName] = packageJson;
    
    // Collect all dependency versions
    ['dependencies', 'devDependencies', 'peerDependencies'].forEach(depType => {
      if (packageJson[depType]) {
        Object.entries(packageJson[depType]).forEach(([dep, version]) => {
          if (!dependencyVersions[dep]) {
            dependencyVersions[dep] = {};
          }
          if (!dependencyVersions[dep][version]) {
            dependencyVersions[dep][version] = [];
          }
          dependencyVersions[dep][version].push(`${packageName} (${depType})`);
        });
      }
    });
  }
});

// Check for version conflicts
Object.entries(dependencyVersions).forEach(([dep, versions]) => {
  const versionKeys = Object.keys(versions);
  
  // Skip workspace dependencies and commonly different packages
  if (dep.startsWith('@verding/') || 
      dep === '@types/node' || 
      dep === 'typescript' ||
      versionKeys.length === 1) {
    return;
  }
  
  if (versionKeys.length > 1) {
    issues.push({
      type: 'version_conflict',
      dependency: dep,
      versions: versions,
      severity: 'warning'
    });
  }
});

// Check workspace dependency syntax
packages.forEach(packageName => {
  const packageJson = packageDetails[packageName];
  
  if (!packageJson) {
    console.warn(`⚠ Package ${packageName} does not have package.json`);
    return;
  }
  
  ['dependencies', 'devDependencies'].forEach(depType => {
    if (packageJson[depType]) {
      Object.entries(packageJson[depType]).forEach(([dep, version]) => {
        if (dep.startsWith('@verding/')) {
          if (version !== 'workspace:*' && version !== '*') {
            issues.push({
              type: 'workspace_syntax',
              package: packageName,
              dependency: dep,
              currentVersion: version,
              expectedVersion: 'workspace:*',
              severity: 'error'
            });
          }
        }
      });
    }
  });
});

// Check for missing workspace dependencies
const verdingPackages = packages.map(p => `@verding/${p}`);
packages.forEach(packageName => {
  const packageJson = packageDetails[packageName];
  
  if (!packageJson) {
    return;
  }
  
  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  };
  
  // Check if package imports from other verding packages
  const srcDir = path.join(packagesDir, packageName, 'src');
  if (fs.existsSync(srcDir)) {
    const files = getJSFiles(srcDir);
    files.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      verdingPackages.forEach(verdingPkg => {
        if (content.includes(`from '${verdingPkg}`) || content.includes(`import('${verdingPkg}`)) {
          if (!allDeps[verdingPkg]) {
            issues.push({
              type: 'missing_dependency',
              package: packageName,
              dependency: verdingPkg,
              file: path.relative(process.cwd(), file),
              severity: 'error'
            });
          }
        }
      });
    });
  }
});

// Report results
if (issues.length === 0) {
  console.log('✅ All workspace dependencies are valid!\n');
  console.log(`Validated ${packages.length} packages:`);
  packages.forEach(pkg => {
    console.log(`  • @verding/${pkg}`);
  });
} else {
  const errors = issues.filter(i => i.severity === 'error');
  const warnings = issues.filter(i => i.severity === 'warning');
  
  if (errors.length > 0) {
    console.log('❌ Dependency validation failed!\n');
    console.log('🚨 ERRORS:');
    errors.forEach(issue => {
      switch (issue.type) {
        case 'workspace_syntax':
          console.log(`  • ${issue.package}: ${issue.dependency} should use "${issue.expectedVersion}" instead of "${issue.currentVersion}"`);
          break;
        case 'missing_dependency':
          console.log(`  • ${issue.package}: Missing dependency "${issue.dependency}" (imported in ${issue.file})`);
          break;
      }
    });
  }
  
  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    warnings.forEach(issue => {
      switch (issue.type) {
        case 'version_conflict':
          console.log(`  • ${issue.dependency} has multiple versions:`);
          Object.entries(issue.versions).forEach(([version, packages]) => {
            console.log(`    - ${version}: ${packages.join(', ')}`);
          });
          break;
      }
    });
  }
  
  if (errors.length > 0) {
    process.exit(1);
  }
}

// Helper function to recursively get JS/TS files
function getJSFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getJSFiles(fullPath));
    } else if (/\.(js|jsx|ts|tsx)$/.test(item)) {
      files.push(fullPath);
    }
  });
  
  return files;
} 
