/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './resources/**/*.blade.php',
  "./resources/**/*.jsx",
  "./resources/**/**/*.jsx",
  "./resources/**/*.js",
],
  theme: {
    extend: {
      padding: {
        '5rem': '5rem',
        '3px' : '3px',
      },
      height :{
        '40%' : '40%'
      },
      fontSize : {
        'small' : '13px'
      }
    },
  },
  plugins: [],
}

