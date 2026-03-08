/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#9D4EDD",
        secondary: "#3A86FF",
        accent: "#FB5607",
        background: "#151718",
        surface: "#1e2022",
        foreground: "#ECEDEE",
        muted: "#9BA1A6",
        border: "#334155",
        success: "#4ADE80",
        warning: "#FB5607",
        error: "#F87171",
      },
    },
  },
  plugins: [],
};