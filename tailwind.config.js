/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#08080a",
          900: "#0b0b0d",
          850: "#111014",
          800: "#161318",
          700: "#1f1b22",
          600: "#2a2530",
        },
        terracotta: {
          300: "#e8a37c",
          400: "#df8456",
          500: "#cf6a3b",
          600: "#b5512a",
          700: "#963f20",
        },
        ember: {
          400: "#ff7a59",
          500: "#ef5a3c",
          600: "#d6391f",
        },
        gold: {
          300: "#f4d58d",
          400: "#e8be6e",
          500: "#d4a24c",
        },
        basil: {
          400: "#8ab36a",
          500: "#6f9a51",
        },
        cream: "#f6efe4",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 80px -20px rgba(232,190,110,0.45)",
        "glow-ember": "0 0 90px -25px rgba(239,90,60,0.5)",
        card: "0 20px 60px -25px rgba(0,0,0,0.7)",
        soft: "0 10px 40px -20px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at center, rgba(232,190,110,0.22), transparent 60%)",
        "grain":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%,100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "fade-up": "fade-up 0.7s ease forwards",
      },
    },
  },
  plugins: [],
};
