import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F2',
        mint: '#BFF3EA',
        lavender: '#C9B7FF',
        ink: '#1F1A24',
        plum: '#5C2A64'
      },
      boxShadow: {
        soft: '0 20px 60px rgba(31, 26, 36, 0.12)'
      }
    }
  },
  plugins: []
};
export default config;
