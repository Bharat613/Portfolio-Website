/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#05070B',
        abyss: '#080C18',
        navyDeep: '#0B1229',
        navyLine: '#182246',
        signal: '#4C6FFF',
        cyanPulse: '#22D3EE',
        violetEdge: '#7C5CFC',
        ink: '#E7ECFF',
        mist: '#8892B0',
        faint: '#4A5578',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(180deg, rgba(76,111,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(76,111,255,0.06) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(76,111,255,0.45)',
        glowCyan: '0 0 40px -12px rgba(34,211,238,0.4)',
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseLine: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        floatY: 'floatY 6s ease-in-out infinite',
        pulseLine: 'pulseLine 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
