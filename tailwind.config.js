/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ["Comfortaa", "cursive"],
      },
    },
  },
};
