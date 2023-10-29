/** @type {import('tailwindcss').Config} */
export default {
  content: ["*", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans'],
      },
      colors: {
        // light mode
        "moderate-blue": "hsl(238, 40%, 52%)",
        "soft-red": "#bf5053",
        "light-grayish-blue": "hsl(239, 57%, 85%)",
        "pale-red": "hsl(357, 100%, 86%)",
        "dark-blue": "hsl(212, 24%, 26%)",
        "grayish-blue": "hsl(211, 10%, 45%)",
        "light-gray": "hsl(223, 19%, 93%)",
        "very-light-gray": "hsl(228, 33%, 97%)",
        "whitee": "hsl(0, 0%, 100%)",

        // dark mode
        "d-moderate-blue": " #7289da",
        "d-soft-red": "#bf5053",
        "d-light-grayish-blue": "#e4e6ec",
        "d-pale-red": "hsl(357, 100 %, 86 %)",
        "d-dark-blue": "#ffffff",
        "d-grayish-blue": "hsl(225, 17 %, 91 %)",
        "d-light-gray": "#2c2f33",
        "d-very-light-gray": "#23272a",
        "d-whitee": "#2c2f33"

      }
    },
  },

  daisyui: {
    themes: ["light","dark"],
  },
  plugins: [
    require("daisyui"),


    function ({ addVariant }) {
      addVariant('child', '& > *');
    }
  ],


}

