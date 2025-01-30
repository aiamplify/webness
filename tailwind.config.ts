import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#9D4EDD",
          hover: "#B75CFF",
        },
        blog: {
          dark: "#1A1F2C",
          card: "rgba(255, 255, 255, 0.05)",
          accent: "#9D4EDD",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-in": "slideIn 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { 
            opacity: "0",
            transform: "translateY(20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { 
            opacity: "0",
            transform: "translateX(-20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)"
          },
        },
        scaleIn: {
          "0%": { 
            opacity: "0",
            transform: "scale(0.95)"
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)"
          },
        },
        float: {
          "0%, 100%": { 
            transform: "translateY(0)"
          },
          "50%": {
            transform: "translateY(-20px)"
          },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
