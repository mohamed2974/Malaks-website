/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Erfasst ALLE Dateien im src-Ordner, egal in welchem Unterordner sie liegen
  ],
  theme: {
    extend: {
      colors: {
        BrandWhite: 'var(--brand-white)',
        BrandDark: 'var(--brand-dark)',
        BgPrim: "var(--background-primary)",
        BgSec: 'var( --background-secondary)',
        TextPrim: "var(--text-primary)",
        TextSec: 'var(--text-secondary)',
        // Markenfarben (Blautöne)
        BrandBlue: 'var(--brand-blue)',
        BrandBlueLight: 'var(--brand-blue-light)',
        BrandBlueDark: 'var(--brand-blue-dark)',
        BrandRed: 'var(--brand-red)',
        BrandRedLight: 'var(--brand-red-light)',
        /* Zusätzliche Akzente für Hinweise/Erfolge */
        AccentGreen: 'var(--accent-green)',
        AccentYellow: 'var(--accent-yellow)',
        ErrorRed: 'var(--error-red)',
        ErrorRedLight: 'var(--error-red-light)',
        SaleRed: 'var(--sale-red)',
        SaleRedLight: 'var(--sale-red-light)',
      },
      padding: {
        GlobalXPad: 'var(--global-x-padding)',
        MdXPad: 'var(--md-x-padding)',
        LgXPad: 'var(--lg-x-padding)'
      },
    },
  },
  plugins: [],
};

export default config;
