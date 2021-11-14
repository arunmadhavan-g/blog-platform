module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],  
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        padding: "2em",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
