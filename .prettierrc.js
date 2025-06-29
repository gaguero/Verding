module.exports = {
  // Core formatting
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,

  // JSX specific
  jsxSingleQuote: true,
  bracketSameLine: false,

  // Other formatting
  arrowParens: 'avoid',
  endOfLine: 'lf',
  bracketSpacing: true,
  quoteProps: 'as-needed',

  // File-specific overrides
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 80,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 80,
        proseWrap: 'always',
      },
    },
    {
      files: '*.yml',
      options: {
        tabWidth: 2,
      },
    },
  ],
};
