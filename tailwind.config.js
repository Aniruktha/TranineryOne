// Tailwind CSS configuration
// Scans these files for class names so unused CSS gets stripped out
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Use Nunito as the default font everywhere
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      // Extra font weights used in the dashboard (Tailwind doesn't ship 800/900 by default)
      fontWeight: {
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900',
      },
    },
  },
  plugins: [],
}
