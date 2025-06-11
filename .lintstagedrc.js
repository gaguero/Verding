module.exports = {
  // TypeScript and JavaScript files
  '*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],

  // CSS and styling files
  '*.{css,scss,sass}': ['stylelint --fix', 'prettier --write'],

  // JSON files
  '*.json': ['prettier --write'],

  // Markdown files
  '*.md': ['prettier --write'],

  // YAML files
  '*.{yml,yaml}': ['prettier --write'],

  // Package.json files
  'package.json': ['prettier --write'],
};
