/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#0d3b22',
          950: '#062414',
        },
        darkgreen: {
          DEFAULT: '#0b3d22',
          light: '#115330',
          dark: '#072816'
        },
        accent: {
          DEFAULT: '#f59e0b',
          hover: '#d97706',
          light: '#fef3c7'
        }
      },
      fontFamily: {
        bengali: ['"Hind Siliguri"', '"Noto Sans Bengali"', 'sans-serif'],
        sans: ['Inter', '"Hind Siliguri"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
