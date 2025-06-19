import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";
import globals from "globals";
import prettier from "eslint-plugin-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default defineConfig([
  {
    ignores: ["dist", "node_modules", "vite.config.ts", "tailwind.config.ts"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      import: importPlugin,
      react,
      prettier,
      "jsx-a11y": jsxA11y,
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
      react: {
        version: "detect",
      },
    },
    rules: {
      // ESLint base
      "linebreak-style": ["error", "unix"],

      // TypeScript
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/comma-dangle": "off",
      "@typescript-eslint/brace-style": "off",
      "@typescript-eslint/no-unused-vars": "warn",

      // React
      "react/react-in-jsx-scope": "off",
      "react/function-component-definition": "off",
      "react/prop-types": "off",
      "react/require-default-props": "off",

      // Import
      "import/no-unresolved": "error",

      // Prettier
      "prettier/prettier": "warn",

      // JSX A11Y
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/aria-role": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-autofocus": "off",
    },
  },
  ...tseslint.configs.recommended,
  js.configs.recommended,
]);
