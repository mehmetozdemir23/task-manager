/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-light': '#F5F5F5',
        'primary-light': '#2196F3',
        'secondary-light': '#9E9E9E',
        'border-light': '#CCCCCC',
        'background-dark': '#212121',
        'primary-dark': '#64B5F6',
        'secondary-dark': '#4a5568',
        'border-dark': '#757575'
      }
    },
  },
  plugins: [],
}
