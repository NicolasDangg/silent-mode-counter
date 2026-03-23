import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
      colors: {
        navy: {
          900: '#050B18',
          800: '#0A1628',
          700: '#0F2040',
        },
        dawn: {
          pink: '#E8A5B4',
          peach: '#F5C6A0',
          blue: '#A8C5E8',
          purple: '#C4A8E8',
        },
      },
      keyframes: {
        'collide-left': {
          '0%':   { transform: 'translateX(-120px)', opacity: '0' },
          '30%':  { opacity: '1' },
          '50%':  { transform: 'translateX(0px)' },
          '55%':  { transform: 'translateX(8px) scale(1.08)' },
          '65%':  { transform: 'translateX(-4px) scale(0.97)' },
          '100%': { transform: 'translateX(0px) scale(1)', opacity: '1' },
        },
        'collide-right': {
          '0%':   { transform: 'translateX(120px)', opacity: '0' },
          '30%':  { opacity: '1' },
          '50%':  { transform: 'translateX(0px)' },
          '55%':  { transform: 'translateX(-8px) scale(1.08)' },
          '65%':  { transform: 'translateX(4px) scale(0.97)' },
          '100%': { transform: 'translateX(0px) scale(1)', opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px 4px rgba(200, 160, 230, 0.3)' },
          '50%':      { boxShadow: '0 0 40px 12px rgba(200, 160, 230, 0.7)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'collide-left':  'collide-left 2.4s cubic-bezier(0.25,0.46,0.45,0.94) infinite',
        'collide-right': 'collide-right 2.4s cubic-bezier(0.25,0.46,0.45,0.94) infinite',
        'pulse-glow':    'pulse-glow 2s ease-in-out infinite',
        'float':         'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
