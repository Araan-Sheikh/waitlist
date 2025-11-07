import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0A84FF",
          50: "#E6F0FF",
          100: "#CCE2FF",
          200: "#99C5FF",
          300: "#66A8FF",
          400: "#338BFF",
          500: "#0A84FF",
          600: "#0066CC",
          700: "#004C99",
          800: "#003366",
          900: "#001F3F"
        }
      },
      backgroundImage: {
        "liquid-1": "radial-gradient(60% 80% at 10% 10%, rgba(91,140,255,.25), transparent 60%), radial-gradient(60% 60% at 90% 20%, rgba(111,255,233,.18), transparent 60%), radial-gradient(80% 60% at 50% 100%, rgba(170,111,255,.16), transparent 60%)",
        "grid": "linear-gradient(to right, rgba(100,116,139,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,116,139,.08) 1px, transparent 1px)"
      },
      backgroundSize: {
        grid: "22px 22px"
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(2,6,23,.15)",
        glow: "0 0 0 1px rgba(255,255,255,.06), 0 6px 30px rgba(91,140,255,.25)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" }
        },
        blob: {
          "0%": { transform: "translate(0px,0px) scale(1)" },
          "33%": { transform: "translate(10px,-20px) scale(1.05)" },
          "66%": { transform: "translate(-10px,10px) scale(0.98)" },
          "100%": { transform: "translate(0px,0px) scale(1)" }
        },
        aurora: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        blob: "blob 16s ease-in-out infinite",
        aurora: "aurora 18s ease infinite"
      },
      blur: { xs: "2px" },
      borderRadius: { xl: "0.9rem", "2xl": "1rem" }
    }
  },
  darkMode: "class",
  plugins: []
};
export default config;
