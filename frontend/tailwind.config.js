
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
        input: "0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)",
        glitter: "inset 0 0 15px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4)",
        "dark-storm": "inset 0 0 10px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(0, 0, 0, 0.4)",
        "glow-blue": "0 0 15px rgba(0, 198, 255, 0.3)",
        "glow-blue-lg": "0 0 40px rgba(0, 198, 255, 0.3)",
        "glow-green": "0 0 15px rgba(0, 255, 136, 0.3)",
        "glow-green-sm": "0 0 6px rgba(0, 255, 136, 0.3)",
        "glow-cta": "0 0 80px rgba(0, 198, 255, 0.3)",
        glow: ["0 0px 20px rgba(255,255, 255, 0.35)", "0 0px 65px rgba(255, 255,255, 0.2)"],
      },
      colors: {
        "void-black": "#0a0a12",
        "void-dark": "#1a1a2a",
        "void-blue": "#00a3ff",
        "nexus-purple": "#7d00ff",
        "void-gray": "#a0a0c0",
      },
      animation: {
        glitter: "glitter 2s infinite linear",
        sparkle: "sparkle 4s infinite linear",
        "gradient-x": "gradient-x 5s ease infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 1.5s infinite",
        "glow-blue": "glow-blue 2s ease-in-out infinite",
        "glow-purple": "glow-purple 2s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-slow": "pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        spotlight: "spotlight 2s ease .75s 1 forwards",
        "hologram-pulse": "hologram-pulse 2s ease-in-out infinite",
        "progress-line": "progress-line 2s infinite alternate",
        aurora: "aurora 60s linear infinite",
        "particle-fall": "particle-fall 8s linear infinite",
        shine: "shine 4s linear infinite",
        "portal-pulse": "portal-pulse 3s infinite",
        "portal-rotate": "portal-rotate 20s infinite",
        "bounce-slow": "bounce-slow 4s infinite",
        "slide-in": "slide-in 1s forwards",
        "glow-pulse": "glow-pulse 4s infinite",
        "glow-rotate": "glow-rotate 20s infinite",
        "fade-in-up": "fadeInUp 0.5s ease-out",
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
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "0.3" },
        },
        "hologram-pulse": {
          "0%": { opacity: 0.3 },
          "50%": { opacity: 0.6 },
          "100%": { opacity: 0.3 },
        },
        spotlight: {
          "0%": { opacity: 0, transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: 1, transform: "translate(-50%,-40%) scale(1)" },
        },
        "progress-line": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        aurora: {
          from: { backgroundPosition: "50% 50%, 50% 50%" },
          to: { backgroundPosition: "350% 50%, 350% 50%" },
        },
        "particle-fall": {
          "0%": { transform: "translateY(-100vh) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(360deg)", opacity: "0" },
        },
        shine: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        spin: 'spin 1.5s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 3s ease-in-out infinite',
        'text-pulse': 'text-pulse 1.5s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(0.8)' }
        },
        'text-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        }
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
