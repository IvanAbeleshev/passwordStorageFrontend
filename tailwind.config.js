/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        'main': '#000',
        'hover': '#fff',
        'btn': '#23a6d5',
        'btn-hover': '#16ddf7',
      },
      keyframes: {
        movebg: {
          '0%, 100%': {'background-position': '0% 50%'},
          '50%': {'background-position': '100% 50%'}
        }
      },
      animation:{
        movebg: 'movebg 15s ease infinite'
      },
      backgroundSize:{
        '400%': '400% 400%'
      },
      backgroundImage: {
        'main-background': 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)'
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%'
      }
    },
  },
  plugins: [],
};
