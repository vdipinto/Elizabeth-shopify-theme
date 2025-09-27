/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layout/**/*.liquid",
    "./sections/**/*.liquid",
    "./snippets/**/*.liquid",
    "./templates/**/*.{liquid,json}",
    "./assets/**/*.liquid"
  ],
  theme: { extend: {
   
    fontFamily: {
      heading: ["'Zalando Sans SemiExpanded'", "sans-serif"],
      body: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
    },
  } },
  plugins: [],
};
