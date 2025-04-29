import { fileURLToPath } from "node:url";

import { includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import type { Linter } from "eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";

const tsrules: Linter.RulesRecord = {
  "no-duplicate-imports": "error",
  // https://typescript-eslint.io/troubleshooting/faqs/eslint#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
  "no-undef": "off",
  "@typescript-eslint/consistent-type-definitions": ["error", "type"],
  "@typescript-eslint/consistent-type-exports": "error",
  "@typescript-eslint/consistent-type-imports": "error",
  "@typescript-eslint/no-import-type-side-effects": "error",
  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      args: "all",
      argsIgnorePattern: "^_",
      caughtErrors: "all",
      caughtErrorsIgnorePattern: "^_",
      destructuredArrayIgnorePattern: "^_",
      varsIgnorePattern: "^_",
      ignoreRestSiblings: true,
    },
  ],
  "@typescript-eslint/restrict-template-expressions": [
    "error",
    {
      allowAny: true,
      allowBoolean: true,
      allowNullish: true,
      allowNumber: true,
      allowRegExp: true,
      allow: [{ name: ["Error", "URL", "URLSearchParams"], from: "lib" }],
    },
  ],
};

export default tseslint.config(
  includeIgnoreFile(fileURLToPath(new URL(".gitignore", import.meta.url))),
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  {
    files: ["*.ts"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: ["./tsconfig.node.json"],
      },
    },
    rules: tsrules,
  },
  {
    files: ["src/**/*.ts", "src/**/*.vue"],
    ignores: ["src/gql/"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      eslintPluginVue.configs["flat/recommended"],
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        extraFileExtensions: [".vue"],
        parser: tseslint.parser,
        project: ["./tsconfig.app.json"],
      },
    },
    rules: {
      ...tsrules,
      // Uncategorized eslint-plugin-vue rules
      "vue/block-lang": ["error", { script: { lang: "ts" } }],
      "vue/block-order": ["warn", { order: ["script", "template", "style"] }],
      "vue/block-tag-newline": [
        "warn",
        {
          singleline: "always",
          multiline: "always",
          maxEmptyLines: 0,
        },
      ],
      "vue/component-api-style": ["error", ["script-setup", "composition"]],
      "vue/component-name-in-template-casing": [
        "warn",
        "PascalCase",
        {
          registeredComponentsOnly: false,
        },
      ],
      "vue/custom-event-name-casing": ["warn", "camelCase"],
      "vue/define-emits-declaration": ["error", "type-based"],
      "vue/define-macros-order": [
        "warn",
        {
          order: [
            "defineModel",
            "defineProps",
            "defineEmits",
            "defineSlots",
            "defineOptions",
          ],
          defineExposeLast: true,
        },
      ],
      "vue/define-props-declaration": ["error", "type-based"],
      "vue/enforce-style-attribute": ["error", { allow: ["scoped"] }],
      "vue/html-button-has-type": [
        "warn",
        {
          button: true,
          submit: true,
          reset: true,
        },
      ],
      "vue/next-tick-style": ["warn", "promise"],
      "vue/no-boolean-default": ["warn", "no-default"],
      "vue/no-duplicate-attr-inheritance": ["warn"],
      "vue/no-ref-object-reactivity-loss": ["warn"],
      "vue/no-required-prop-with-default": ["warn"],
      "vue/no-root-v-if": ["warn"],
      "vue/no-template-target-blank": [
        "error",
        {
          allowReferrer: false,
          enforceDynamicLinks: "always",
        },
      ],
      "vue/no-undef-components": [
        "warn",
        {
          // Quasar and Vue Router components
          ignorePatterns: ["q(\\-\\w+)+", "router\\-view", "router\\-link"],
        },
      ],
      "vue/no-undef-properties": ["warn"],
      "vue/no-unused-emit-declarations": ["warn"],
      "vue/no-unused-properties": ["warn"],
      "vue/no-unused-refs": ["warn"],
      "vue/no-use-v-else-with-v-for": ["warn"],
      "vue/no-useless-mustaches": [
        "warn",
        {
          ignoreIncludesComment: false,
          ignoreStringEscape: false,
        },
      ],
      "vue/no-useless-v-bind": [
        "warn",
        {
          ignoreIncludesComment: false,
          ignoreStringEscape: false,
        },
      ],
      "vue/no-v-text": ["warn"],
      "vue/padding-line-between-blocks": ["warn", "always"],
      "vue/prefer-define-options": ["error"],
      "vue/prefer-prop-type-boolean-first": ["warn"],
      "vue/prefer-separate-static-class": ["warn"],
      "vue/prefer-true-attribute-shorthand": ["warn"],
      "vue/prefer-use-template-ref": ["warn"],
      "vue/require-explicit-slots": ["warn"],
      "vue/require-macro-variable-name": [
        "warn",
        {
          defineProps: "props",
          defineEmits: "emit",
          defineSlots: "slots",
          useSlots: "slots",
          useAttrs: "attrs",
        },
      ],
      "vue/require-typed-object-prop": ["warn"],
      "vue/require-typed-ref": ["warn"],
      "vue/slot-name-casing": ["warn", "camelCase"],
      "vue/v-for-delimiter-style": ["warn", "in"],
      "vue/valid-define-options": ["error"],
    },
  },
  eslintConfigPrettier,
);
