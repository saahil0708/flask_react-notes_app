/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#000000', /* Exact Black */
          secondary: '#0a0a0a', /* Very dark gray */
          tertiary: '#171717', /* Dark gray */
        },
        accent: {
          primary: '#f97316', /* Orange-500 */
          hover: '#ea580c', /* Orange-600 */
          light: '#431407', /* Orange-950 for subtle active backgrounds */
        },
        border: {
          subtle: 'rgba(255,255,255,0.08)',
          strong: 'rgba(249,115,22,0.3)',
        },
        text: {
          primary: '#f8fafc', /* Slate 50 */
          secondary: '#94a3b8', /* Slate 400 */
          muted: '#64748b', /* Slate 500 */
        }
      },
      fontFamily: {
        main: ['GT Flexa Lt', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
