/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F2184F',
        secondary: '#333',
      },
    },
  },
  plugins: [require('daisyui')],
};
