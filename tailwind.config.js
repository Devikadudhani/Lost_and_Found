/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        themeGreen: "#135106",
        themeCream: "#fdf5e6",
      },
      fontFamily: {},
    },
  },
  plugins: [],
};
