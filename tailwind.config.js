import daisyui from 'daisyui';
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        singleDay: ['Single Day','sans-serif'],
        sourceCodePro: ['Source Code Pro']
      }
    },
  },
  plugins: [daisyui],
};
