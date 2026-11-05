/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jb: {
          green: '#b2bea5',       // JuiceBot Section 1 Sage
          'green-light': '#c5cfbc',
          beige: '#e3cba5',       // JuiceBot Section 2 Warm Beige
          'beige-light': '#ebd9bd',
          red: '#daad9d',         // JuiceBot Section 3 Salmon / Terracotta
          'red-light': '#e8c2b5',
          gray: '#e1dcd6',        // JuiceBot Section 4 Warm Limestone Gray
          'gray-light': '#ece8e3',
          dark: '#292929',        // JuiceBot Near-Black text and selection
          muted: '#454545',
          subtle: '#666666',
        },
        spice: {
          turmeric: '#e28812',
          chilli: '#c53424',
          coriander: '#236e3f',
          pomegranate: '#d22d5d',
        }
      },
      fontFamily: {
        display: ['"blamo-bold"', 'HelveticaNeue-Bold', '"Arial Black"', 'sans-serif'],
        body: ['"blamo-book"', 'HelveticaNeue', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['"blamo-book"', 'HelveticaNeue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'jb-hero': ['clamp(3.125rem, 8vw, 6.875rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'jb-section': ['clamp(2.25rem, 5.5vw, 5.625rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'jb-subheading': ['clamp(1.25rem, 2.5vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      }
    },
  },
  plugins: [],
}
