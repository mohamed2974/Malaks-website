/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Erfasst ALLE Dateien im src-Ordner, egal in welchem Unterordner sie liegen
  ],
  theme: {
    extend: {
      colors: {
        backgroundPrim: "var(--background-primary)",
        TextPrim: "var(--text-primary)",
        TextSec: 'var(--text-scondary)',
        AppleBlue: 'var(--apple-blue)',
        AppleOrange: 'var(--apple-orange)',
        AppleRed: 'var(--apple-red)',
        FreshGreen: 'var(--fresh-green)',
        NeonYellow: 'var(--neon-yellow)',
      },
      padding: {
        GlobalXPad: 'var(--global-x-padding)',
        MdXPad: 'var(--md-x-padding)',
        LgXPad: 'var(--lg-x-padding)'
      }
    },
  },
  plugins: [],
};

export default config;
