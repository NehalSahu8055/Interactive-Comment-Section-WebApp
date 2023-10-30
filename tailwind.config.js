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
        "moderate-blue": "#5457b6",
        "soft-red": "#bf5053",
        "light-grayish-blue": "#c5d9ec",
        "pale-red": "#ff7171",
        "dark-blue": "#1b3247",
        "grayish-blue": "#6d8b99",
        "light-gray": "#e3eaed",
        "very-light-gray": "#f4f8fb",
        "whitee": "#ffffff",

        // dark mode
        "d-moderate-blue": "#7289da",
        "d-soft-red": "#bf5053",
        "d-light-grayish-blue": "#e4e6ec",
        "d-pale-red": "#ff7171",
        "d-dark-blue": "#ffffff",
        "d-grayish-blue": "#e6f0f4",
        "d-light-gray": "#2c2f33",
        "d-very-light-gray": "hsl(0, 0%, 13%)",
        "d-whitee": "#2c2f33"

      }


    },
  },

  daisyui: {
    themes: ["light", "dark"],
  },
  plugins: [
    require("daisyui"),


    function ({ addVariant }) {
      addVariant('child', '& > *');
    }
  ],


}

