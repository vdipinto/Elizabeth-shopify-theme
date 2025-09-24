# 🚀 Shopify Theme Dev Setup (Tailwind + ESLint + Prettier + Husky)

This guide shows how to set up a modern dev workflow for a **Shopify Liquid theme** with TailwindCSS, ESLint, Prettier, and Husky.

---

## 1. Initialize Project

```bash
npm init -y
```

## 2. Install Dev Dependencies

```bash
npm install -D eslint @eslint/js eslint-config-prettier prettier husky lint-staged
npm install -D tailwindcss postcss autoprefixer
npm install -D @shopify/prettier-plugin-liquid prettier-plugin-tailwindcss
```

## 3. ESLint Setup (Flat Config)

**eslint.config.mjs**
```js
import js from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "module" },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  {
    files: ["postcss.config.js", "tailwind.config.js"],
    languageOptions: { sourceType: "commonjs" },
    rules: { "no-undef": "off" },
  },
];
```

## 4. Prettier Setup

**prettier.config.mjs**
```js
export default {
  plugins: ["@shopify/prettier-plugin-liquid", "prettier-plugin-tailwindcss"],
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  printWidth: 120,
};
```

**.prettierignore**
```
node_modules
assets/application.css
dist
build
```

## 5. Tailwind Setup

```bash
npx tailwindcss init -p
```

**tailwind.config.js**
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./layout/**/*.liquid",
    "./sections/**/*.liquid",
    "./snippets/**/*.liquid",
    "./templates/**/*.{liquid,json}",
    "./assets/**/*.liquid"
  ],
  theme: { extend: {} },
  plugins: [],
};
```

**src/styles/tailwind.css**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 6. Package.json Scripts

```json
"scripts": {
  "dev": "tailwindcss -i ./src/styles/tailwind.css -o ./assets/application.css --watch",
  "build:css": "tailwindcss -i ./src/styles/tailwind.css -o ./assets/application.css --minify",
  "lint": "eslint .",
  "format": "prettier --write .",
  "prepare": "husky",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

## 7. Husky Setup

```bash
npx husky install
```

**.husky/pre-commit**
```sh
#!/bin/sh
npx lint-staged
```

**.husky/pre-push**
```sh
#!/bin/sh

echo "⚡ Building Tailwind for production before push..."

if ! npm run build:css; then
  echo "❌ Tailwind build failed. Push aborted."
  exit 1
fi

git add assets/application.css
echo "✅ Tailwind build complete. application.css staged for push."
```

```bash
chmod +x .husky/pre-commit .husky/pre-push
```

## 8. Lint-Staged Config (package.json)

```json
"lint-staged": {
  "*.js": ["eslint --fix", "prettier --write"],
  "*.json": ["prettier --write"],
  "*.liquid": ["prettier --write"],
  "*.css": ["prettier --write"]
}
```

## 9. Gitignore

**.gitignore**
```
# Node
node_modules
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Shopify
dist/
build/
.cache/
*.tmp
*.log

# Theme Kit / Shopify CLI
.shopify-cli.yml
*.env
.env.local
.env.*.local

# macOS
.DS_Store
.AppleDouble
.LSOverride

# VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json

# System files
Thumbs.db
ehthumbs.db
Desktop.ini

# Logs
logs
*.log

# Ignore build output (but not source)
assets/application.css
```

## 10. Shopify Theme Integration

**layout/theme.liquid**
```liquid
{{ 'application.css' | asset_url | stylesheet_tag }}
```

## 11. Development Workflow

- Terminal A:
  ```bash
  npm run dev
  ```
- Terminal B:
  ```bash
  shopify theme dev --store your-store-name
  ```

- Before pushing:
  ```bash
  git push
  ```
