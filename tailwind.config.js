/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1A73E8', // Change this to your preferred color
        secondary: '#FBBF24',
        background: '#F9FAFB',
        text: '#111827',
        accent: '#10B981',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
