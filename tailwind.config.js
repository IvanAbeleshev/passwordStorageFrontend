/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        'main': '#000',
        'hover': '#fff',
        'btn': '#23a6d5',
        'btn-hover': '#16ddf7',
        'btn-s': '#242526',
        'btn-s-hover': '#696969',
        'btn-err': 'rgb(253 164 175)',
        'btn-err-hover': 'rgb(251 113 133)',

        'dcontainer': '#333333',
        'dlink': '#00BFFF',
        'dbtn-h': '#00157F',
        'dbtn': '#00094B'
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
        '400%': '400% 400%',
        '100%': '100% 100%'
      },
      backgroundImage: {
        'main-background': 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        'dark-bg': "url('./img/darkbg.jpg')",
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%'
      }
    },
  },
  plugins: [],
};
