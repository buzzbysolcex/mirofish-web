import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0f',
        'bg-card': '#12121a',
        'border-card': '#1a1a2e',
        'accent-cyan': '#00ffff',
        'accent-green': '#00ff88',
        'accent-red': '#ff4444',
        'accent-yellow': '#ffff00',
        'accent-magenta': '#ff00ff',
        'accent-purple': '#7c3aed',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
