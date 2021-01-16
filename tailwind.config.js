module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        amarillo: '#FFCB05',
        azul: '#034EA2',
        blanco: '#ffffff'
      },
    },
    fontFamily: {
      black: ['Gotham-Black'],
      book: ['Gotham-Book']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
