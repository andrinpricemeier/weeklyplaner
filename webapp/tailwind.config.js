/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        offwhite: "#f4ddd8",
        black: "#000000",
        white: "#ffffff",
        blue: "#285b7c",
        red: "#e86d6f",
        orange: "#f19838"
      },
    },
  },
  plugins: [],
};
