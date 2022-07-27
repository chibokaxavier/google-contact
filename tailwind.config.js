/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./route/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
        product_bold: ['Product-Sans-Bold']
      },
      colors: {
        "gray-google": "#5f6368",
      },
    },
  },
  plugins: [],
};
