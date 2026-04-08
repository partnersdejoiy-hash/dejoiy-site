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
        bg:       "#020617",
        surface:  "#0B1226",
        surface2: "#111A3A",
        blue:     "#2563EB",
        purple:   "#7C3AED",
        cyan:     "#06B6D4",
        "text-primary":   "#F8FAFC",
        "text-secondary": "#CBD5E1",
        "text-muted":     "#94a3b8",
        "text-dim":       "#64748b"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"]
      },
      boxShadow: {
        glow:        "0 0 40px rgba(124,58,237,0.4)",
        "glow-sm":   "0 0 20px rgba(124,58,237,0.3)",
        "glow-blue": "0 0 40px rgba(37,99,235,0.4)",
        "glow-cyan": "0 0 40px rgba(6,182,212,0.35)",
        card:        "0 20px 60px rgba(0,0,0,0.5)",
        mega:        "0 30px 80px rgba(0,0,0,0.55)"
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(37,99,235,0.22) 0%, transparent 60%), linear-gradient(180deg, #020617 0%, #030A1A 100%)",
        "card-gradient-1": "linear-gradient(135deg, rgba(37,99,235,0.14), rgba(124,58,237,0.1))",
        "card-gradient-2": "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.1))",
        "card-gradient-3": "linear-gradient(135deg, rgba(6,182,212,0.1), rgba(37,99,235,0.12))",
        "cta-gradient":    "linear-gradient(135deg, rgba(37,99,235,0.18), rgba(124,58,237,0.18))"
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
          "0%,100%": { boxShadow: "0 0 0 rgba(124,58,237,0)" },
          "50%":     { boxShadow: "0 0 50px rgba(124,58,237,0.55)" }
        }
      }
    }
  },
  plugins: []
};
