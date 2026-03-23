import type { Config } from 'tailwindcss';
import dcyfrPreset from './tailwind.preset';

const config: Config = {
  presets: [dcyfrPreset],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
