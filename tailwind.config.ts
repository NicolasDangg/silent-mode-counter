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
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#03071e',
          900: '#050d2a',
          800: '#0a1540',
          700: '#0f1f5c',
        },
        dawn: {
          pink: '#f7a8b8',
          peach: '#ffcba4',
          lilac: '#c9b8f7',
          blue: '#a8c8f7',
        },
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(167, 139, 250, 0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(167, 139, 250, 0.8), 0 0 120px rgba(167, 139, 250, 0.4)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
