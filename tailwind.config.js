module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      serif: ['Roboto Slab', 'serif'],
      sans: ['Roboto Condensed', 'sans-serif'],
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
