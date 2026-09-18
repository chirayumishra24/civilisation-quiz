/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FFFDF5',
        cream: '#FFF8E7',
        beige: '#F5E6D3',
        'warm-white': '#FEFCF3',
        mohenjo: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        dholavira: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
        },
        terracotta: {
          100: '#F5D5C8',
          200: '#E8B4A0',
          300: '#D4896E',
          400: '#C4704F',
          500: '#B85C3A',
          600: '#A04D2E',
        },
        earth: {
          100: '#F0E6D3',
          200: '#E0CDB0',
          300: '#C4A87A',
          400: '#A68B5B',
          500: '#8B7355',
          600: '#6B5B45',
        },
      },
      fontFamily: {
        bungee: ['Bungee', 'cursive'],
        fredoka: ['Fredoka', 'sans-serif'],
      },
      borderRadius: {
        'clay': '16px',
        'clay-lg': '24px',
        'clay-xl': '32px',
      },
      boxShadow: {
        'clay-sm': '4px 4px 10px rgba(0,0,0,0.08), -2px -2px 8px rgba(255,255,255,0.9), inset 1px 1px 2px rgba(255,255,255,0.5)',
        'clay': '6px 6px 16px rgba(0,0,0,0.1), -4px -4px 12px rgba(255,255,255,0.9), inset 2px 2px 4px rgba(255,255,255,0.5)',
        'clay-lg': '8px 8px 24px rgba(0,0,0,0.12), -6px -6px 16px rgba(255,255,255,0.9), inset 2px 2px 6px rgba(255,255,255,0.6)',
        'clay-inset': 'inset 4px 4px 10px rgba(0,0,0,0.08), inset -2px -2px 8px rgba(255,255,255,0.5)',
        'clay-button': '4px 4px 12px rgba(0,0,0,0.1), -2px -2px 8px rgba(255,255,255,0.8), inset 1px 1px 3px rgba(255,255,255,0.6)',
        'clay-button-pressed': 'inset 3px 3px 8px rgba(0,0,0,0.1), inset -1px -1px 4px rgba(255,255,255,0.4)',
      },
      animation: {
        'rise-in': 'riseIn 0.6s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
        'glow': 'glow 1.5s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'bounce-in': 'bounceIn 0.5s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'streak-glow': 'streakGlow 1s ease-in-out infinite alternate',
      },
      keyframes: {
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-4px)' },
          '40%': { transform: 'translateX(4px)' },
          '60%': { transform: 'translateX(-2px)' },
          '80%': { transform: 'translateX(2px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        streakGlow: {
          '0%': { boxShadow: '0 0 10px rgba(251, 146, 60, 0.4)' },
          '100%': { boxShadow: '0 0 30px rgba(251, 146, 60, 0.7)' },
        },
      },
    },
  },
  plugins: [],
}
