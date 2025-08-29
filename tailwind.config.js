// tailwind.config.js
export default {
  darkMode: "class", // 👈 add this line
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        moveTaxi: {
          "0%": { transform: "translateX(95vw)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        moveTaxiDesktop: "moveTaxi 30s linear infinite",
        moveTaxiMobile: "moveTaxi 10s linear infinite",
      },
    },
  },
  plugins: [],
};
