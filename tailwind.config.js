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
        primary: "#0A0F3C",
        secondary: "#6B5CFF",
        accent: "#2E7BFF",
        highlight: "#FF4FD8"
      },
      boxShadow: {
        glow: "0 0 40px rgba(107, 92, 255, 0.35)",
        pink: "0 0 30px rgba(255, 79, 216, 0.35)"
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top left, rgba(46,123,255,0.25), transparent 30%), radial-gradient(circle at top right, rgba(255,79,216,0.2), transparent 30%), linear-gradient(135deg, #0A0F3C 0%, #161B56 45%, #6B5CFF 100%)",
        "card-gradient-1":
          "linear-gradient(135deg, rgba(46,123,255,0.25), rgba(107,92,255,0.18))",
        "card-gradient-2":
          "linear-gradient(135deg, rgba(255,79,216,0.18), rgba(46,123,255,0.22))",
        "card-gradient-3":
          "linear-gradient(135deg, rgba(107,92,255,0.22), rgba(10,15,60,0.45))"
      },
      borderRadius: {
        xl2: "2rem",
        dshape: "3rem"
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        gradientShift: "gradientShift 10s ease infinite"
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" }
        },
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 0 rgba(107,92,255,0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(107,92,255,0.45)" }
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        }
      }
    }
  },
  plugins: []
};