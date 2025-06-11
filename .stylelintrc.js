module.exports = {
  rules: {
    // Only the most basic rules to avoid errors
    'block-no-empty': null,
    'color-no-invalid-hex': true,
    'declaration-block-no-duplicate-properties': true,
    'no-duplicate-selectors': null,
    'no-empty-source': null,
  },
  ignoreFiles: [
    'node_modules/**/*', 
    'dist/**/*', 
    'build/**/*', 
    '.turbo/**/*',
    '**/generated/**/*',
  ],
};
