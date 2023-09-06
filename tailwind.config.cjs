/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'itemContainer': '33rem',
        '66': '264px'
      },

      colors: {
        lowPrio: '#457B9D',
        medPrio: '#FFC211',
        highPrio: '#E63946'
      } 
    }
  },
  plugins: [],
  safelist: [{
    pattern: /(bg|text|border)-highPrio|medPrio|lowPrio/
  }]
}