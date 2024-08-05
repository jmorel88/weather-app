/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        black: {
          100: "#111015",
          200: "#1b1b1d",
          300: "#1e1e1e",
        },
        white: {
          900: "#fff",
          800: "#fdfdfd",
        },
        orange: "#FFA34E",
      },
    },
  },
  plugins: [],
};
