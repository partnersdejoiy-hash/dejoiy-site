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
        bg:       "#fff6e8",
        surface:  "#ffffff",
        surface2: "#ffe680",
        blue:     "#2f6bff",
        purple:   "#ff4fa3",
        cyan:     "#0a8fc4",
        "text-primary":   "#141414",
        "text-secondary": "#3f3f3f",
        "text-muted":     "#6b6b6b",
        "text-dim":       "#8a8a8a"
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"]
      },
      boxShadow: {
        glow:        "5px 5px 0 #141414",
        "glow-sm":   "3px 3px 0 #141414",
        "glow-blue": "5px 5px 0 #2f6bff",
        "glow-cyan": "5px 5px 0 #d4ff3a",
        card:        "5px 5px 0 #141414",
        mega:        "8px 8px 0 #141414"
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(47,107,255,0.18) 0%, transparent 60%), #fff6e8",
        "card-gradient-1": "linear-gradient(135deg, #a9c2ff, #a9c2ff)",
        "card-gradient-2": "linear-gradient(135deg, #ffa8d2, #ffa8d2)",
        "card-gradient-3": "linear-gradient(135deg, #e4ff80, #e4ff80)",
        "cta-gradient":    "linear-gradient(135deg, #2f6bff, #2f6bff)"
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem"
      },
      animation: {
        float:       "float 8s ease-in-out infinite",
        "pulse-glow":"pulseGlow 3s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        marquee:     "marquee 40s linear infinite"
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-12px)" }
        },
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 0 rgba(255,79,163,0)" },
          "50%":     { boxShadow: "0 0 30px rgba(255,79,163,0.45)" }
        }
      }
    }
  },
  plugins: []
};
