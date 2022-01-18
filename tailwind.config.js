module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      keyframes: {
        countdown: {
          '0%': { transform: 'scaleX(100)' },
          '100%': { transform: 'scaleX(0)' }
        }
      }
    }
  },
  plugins: []
}
