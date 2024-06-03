import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/ban-types": [
        "error",
        {
          types: {
            any: {
              message: "Use a more specific type instead of `any`.",
            },
            unknown: {
              message: "Use a more specific type instead of `unknown`.",
            },
          },
        },
      ],
    },
  },
  {
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "no-console": "error",
    },
  },
  {
    ignores: ["node_modules/", "dist/", "build/"],
  },
];
