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
        // Counter numbers & UI labels — high-end geometric sans, tight tracking
        sans: ['var(--font-dm-sans)', '"SF Pro Display"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        // Headings, button, editorial text — elegant old-style serif
        serif: ['var(--font-cormorant)', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
      colors: {
        navy: {
          950: '#020817',
          900: '#040f26',
          800: '#071a4a',
        },
      },
    },
  },
  plugins: [],
};

export default config;
