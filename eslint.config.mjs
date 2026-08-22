export default [
  {
    ignores: ["node_modules/**", "dist/**", "coverage/**"]
  },
  {
    files: ["**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        CONFIG: "readonly",
        Hooks: "readonly",
        Item: "readonly",
        game: "readonly",
        foundry: "readonly"
      }
    },
    rules: {
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "no-undef": "error"
    }
  }
];
