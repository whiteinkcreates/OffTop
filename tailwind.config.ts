import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'offtop-dark': '#0a0e27',
        'offtop-accent': '#00ff88',
        'offtop-accent-light': '#00ff99',
        'offtop-accent-dim': '#00cc6b',
        'offtop-cold': '#00d4ff',
        'offtop-danger': '#ff004d',
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
    },
  },
  plugins: [],
}
export default config
