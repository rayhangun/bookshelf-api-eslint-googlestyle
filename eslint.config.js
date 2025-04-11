// eslint.config.js
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module", // ⬅️ PENTING! Tanda bahwa kamu pakai import/export
    },
    rules: {
      indent: ["error", 2],
      quotes: ["error", "single"],
      "no-console": "off",
      "no-undef": "off",
      "no-unused-vars": "warn",
      "require-jsdoc": "off",
      "comma-dangle": ["error", "always-multiline"],
    },
  },
];
