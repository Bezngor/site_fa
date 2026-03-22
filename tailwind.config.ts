import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1B2A4A',
        amber: '#F59E0B',
        white: '#FFFFFF',
        'gray-light': '#F8F9FA',
      },
    },
  },
  plugins: [],
};
export default config;
