/** @type {import('tailwindcss').Config} */
export default module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/styles/utility.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        geologica: ["Geologica", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
      },
    },
    container: {
      center: true,
      screens: {
        sm: "560px",
        md: "768px",
        lg: "920px",
        xl: "1080px",
      },
    },
  },
  plugins: [],
};
