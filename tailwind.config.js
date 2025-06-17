/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // 👈 enables dark mode using a CSS class
  theme: {
    extend: {
      colors: {
        primary: '#1A73E8',
        secondary: '#F1F3F4',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}