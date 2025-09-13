// eslint.config.mjs - flat config
// Requires: @eslint/js, typescript-eslint, eslint-plugin-react-hooks, eslint-plugin-testing-library, eslint-plugin-unused-imports
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import testingLibrary from "eslint-plugin-testing-library";

export default [
  { ignores: ["node_modules/**", ".next/**", "dist/**", "coverage/**", "playwright-report/**", "test-results/**"] },

  // Base JS rules
  js.configs.recommended,

  // TypeScript (type-checked)
  ...tseslint.configs.recommendedTypeChecked.map((cfg) => ({
    ...cfg,
    languageOptions: {
      ...cfg.languageOptions,
      parserOptions: {
        ...cfg.languageOptions?.parserOptions,
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  })),

  // Testing Library (prefer testids to avoid i18n flakiness)
  {
    files: ["**/__tests__/**/*.{ts,tsx}", "**/*.test.{ts,tsx}"],
    plugins: { "testing-library": testingLibrary },
    rules: {
      "testing-library/no-node-access": "error",
      // allow getByTestId; we intentionally avoid getByText to prevent i18n flakiness
    },
  },

  // Common rules
  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
    },
  },
];
