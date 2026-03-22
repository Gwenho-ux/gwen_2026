/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: '#FFFFFF',
        surface: '#F4F4F2',
        border: '#E8E8E5',
        primary: '#0D0D0D',
        secondary: '#888885',
        accent: '#63752F',
        'accent-hover': '#4f5e25',
      },
      borderRadius: {
        card: '20px',
      },
      letterSpacing: {
        display: '-0.03em',
        tight: '-0.02em',
        label: '0.08em',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
}
