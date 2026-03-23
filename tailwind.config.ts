import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
      colors: {
        navy: {
          950: '#020817',
          900: '#040f2d',
          800: '#071a4a',
          700: '#0d2666',
        },
        dawn: {
          100: '#fce4ec',
          200: '#f8bbd0',
          300: '#f48fb1',
          400: '#e879a0',
        },
        glow: '#7c6af7',
      },
      animation: {
        'collide': 'collide 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        collide: {
          '0%': { transform: 'translateX(-120px)' },
          '45%, 55%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(-120px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
