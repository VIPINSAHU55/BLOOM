/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        dash: "dash 0.5s ease-in-out infinite",
      },
      keyframes: {
        dash: {
          "0%": {
            strokeDasharray: "1, 200",
            strokeDashoffset: "0",
          },
          "50%": {
            strokeDasharray: "90, 200",
            strokeDashoffset: "-35px",
          },
          "100%": {
            strokeDashoffset: "-125px",
          },
        },
      },
    },
  },
  plugins: [],

}

