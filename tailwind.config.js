/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#030712',
          900: '#0b1120',
          850: '#111827',
          800: '#1f2937',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      boxShadow: {
        'emerald-glow': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
        'cyan-glow': '0 0 25px -5px rgba(6, 182, 212, 0.3)',
        'amber-glow': '0 0 25px -5px rgba(245, 158, 11, 0.3)',
        'rose-glow': '0 0 25px -5px rgba(244, 63, 94, 0.3)',
      }
    },
  },
  plugins: [],
}
