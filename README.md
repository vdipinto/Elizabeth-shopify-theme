# Elizabeth – Shopify Theme

A custom Shopify theme built with **Liquid**, styled using **TailwindCSS**, and powered by a modern dev workflow with **ESLint**, **Prettier**, and **Husky**.

---

## ⚡ Quick Setup

```bash
git clone git@github.com:vdipinto/elizabeth.git
cd elizabeth
npm install
npm run dev            # start Tailwind in watch mode
shopify theme dev --store your-store-name
```

---

## 🚀 Features

- ⚡ **TailwindCSS** for rapid styling
- ✅ **ESLint** (Flat Config) + **Prettier** for linting and formatting
- 🧩 **Prettier Plugin for Liquid** + **Tailwind class sorting**
- 🐶 **Husky** + **lint-staged** to enforce code quality before commits
- 🔧 **Pre-push hook** to always build production-ready CSS
- 🛠️ Compatible with **Shopify CLI**

---

## 🛠️ Development

Run Tailwind in **watch mode** and start the Shopify dev server:

### Terminal A – Tailwind watcher
```bash
npm run dev
```

### Terminal B – Shopify CLI
```bash
shopify theme dev --store your-store-name
```

Your theme will be served locally with live reload.

---

## 🏗️ Build for Production

Minify and purge unused styles:

```bash
npm run build:css
```

This generates the final `assets/application.css`.

---

## 🔍 Linting & Formatting

Lint with ESLint:

```bash
npm run lint
```

Format with Prettier:

```bash
npm run format
```

Husky hooks will automatically run these checks on staged files before commits.

---

## 🐶 Git Hooks

- **Pre-commit** → Runs `lint-staged` (ESLint + Prettier)  
- **Pre-push** → Runs `npm run build:css` and stages the new CSS  

---

## 📂 Project Structure

```
elizabeth/
├─ assets/              # Shopify assets (application.css, JS, images, etc.)
├─ layout/              # Theme layouts
├─ sections/            # Theme sections
├─ snippets/            # Theme snippets
├─ templates/           # Theme templates
├─ src/styles/          # Tailwind source CSS
│   └─ tailwind.css
├─ .husky/              # Husky git hooks
├─ eslint.config.mjs    # ESLint config
├─ prettier.config.mjs  # Prettier config
├─ tailwind.config.js   # Tailwind config
├─ postcss.config.js    # PostCSS config
└─ package.json
```

---

## 📝 License

MIT © 2025 [Your Name]
