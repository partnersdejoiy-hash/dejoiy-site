/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./animations/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#05071a",
        secondary: "#6B5CFF",
        accent: "#2E7BFF",
        highlight: "#FF4FD8",
        surface: "#0d1030",
        "surface-2": "#131535"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 40px rgba(107,92,255,0.35)",
        "glow-sm": "0 0 20px rgba(107,92,255,0.25)",
        pink: "0 0 30px rgba(255,79,216,0.3)",
        card: "0 20px 60px rgba(0,0,0,0.4)",
        mega: "0 30px 80px rgba(0,0,0,0.45)"
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(107,92,255,0.25) 0%, transparent 60%), linear-gradient(180deg, #05071a 0%, #080c25 100%)",
        "card-gradient-1": "linear-gradient(135deg, rgba(46,123,255,0.12), rgba(107,92,255,0.08))",
        "card-gradient-2": "linear-gradient(135deg, rgba(255,79,216,0.1), rgba(46,123,255,0.1))",
        "card-gradient-3": "linear-gradient(135deg, rgba(107,92,255,0.12), rgba(5,7,26,0.6))",
        "cta-gradient": "linear-gradient(135deg, rgba(46,123,255,0.15), rgba(107,92,255,0.15))"
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem"
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        marquee: "marquee 30s linear infinite"
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 0 rgba(107,92,255,0)" },
          "50%": { boxShadow: "0 0 50px rgba(107,92,255,0.5)" }
        }
      }
    }
  },
  plugins: []
};
