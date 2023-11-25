import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'carrot-orange': {
        '50': '#fff7eb',
        '100': '#fde9c8',
        '200': '#fbd28c',
        '300': '#f9b350',
        '400': '#f7941d',
        '500': '#f1750f',
        '600': '#d5530a',
        '700': '#b1360c',
        '800': '#902b10',
        '900': '#762311',
        '950': '#440f04',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}
export default config
