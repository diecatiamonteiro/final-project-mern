/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        midnightBlack: "#0A0A0A",
        green: "#059669",
        greenHover: "#047857",
        offwhite: "#F5F5F3",
      },
      keyframes: {
        modal: {
          "0%": { transform: "scale(0.95)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
      animation: {
        modal: "modal 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
