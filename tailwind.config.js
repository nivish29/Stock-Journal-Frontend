/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "dark-purple":"#081A51",
        "light-white":"rgba(255,255,255,0.17)"
      },
      screens: {
        'between-lg-md': {'min':'1024px','max':'1270px'},
        'between-md-sm': {'min':'768px','max':'1024px'},
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require("daisyui"),
  ],
}

