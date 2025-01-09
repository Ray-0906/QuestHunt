/** @type {import('tailwindcss').Config} */
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      animation: {
        glitter: "glitter 2s infinite linear",
        sparkle: "sparkle 4s infinite linear",
      },
      keyframes: {
        glitter: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        sparkle: {
          "0%": { opacity: 0.3 },
          "50%": { opacity: 0.6 },
          "100%": { opacity: 0.3 },
        },
      },
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 0.35)",
          "0 0px 65px rgba(255, 255,255, 0.2)"
        ]
      },
      boxShadow: {
        'gliter': `
         inset 0 0 15px rgba(255, 255, 255, 0.5),
          0 0 10px rgba(255, 255, 255, 0.6),
          0 0 20px rgba(255, 255, 255, 0.4)
        `,
        'dark-storm': `
          inset 0 0 10px rgba(0, 0, 0, 0.6),
          inset 0 0 20px rgba(0, 0, 0, 0.4)
        `,
      },
    },
  },
  plugins: [
    function addVariablesForColors({ addBase, theme }) {
      const allColors = flattenColorPalette(theme("colors"));
      const newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
      );

      addBase({
        ":root": newVars,
      });
    },
  ],
};
