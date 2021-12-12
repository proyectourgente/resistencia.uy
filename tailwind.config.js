module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        amarillo: '#FFCB05',
        azul: '#3F4BFF',
        blanco: '#ffffff',
        rosado: '#FC83EE',
      },
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      book: ['Gotham-Book']
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
      extra: 800,
      black: 900,
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
