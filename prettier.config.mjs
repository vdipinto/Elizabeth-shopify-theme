// prettier.config.mjs
import liquid from "@shopify/prettier-plugin-liquid";

export default {
  singleQuote: true,
  trailingComma: "es5",
  semi: true,
  printWidth: 100,
  plugins: [liquid],
  overrides: [
    {
      files: "*.liquid",
      options: {
        singleQuote: false,
        printWidth: 120
      }
    }
  ]
};
