/** @type {import('tailwindcss').Config} */
module.exports = {
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
