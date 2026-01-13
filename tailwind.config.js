/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#0F1724',
        'muted': '#6B7280',
        'teal': '#0EA5A4',
        'coral': '#FF7A59',
        'yellow': '#FCD34D',
        'blue': '#93C5FD',
        'purple': '#A855F7',
        'pink': '#EC4899',
        'orange': '#FB923C',
      },
      fontFamily: {
        'heading': ['Poppins', 'Inter', 'sans-serif'],
        'body': ['Inter', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

