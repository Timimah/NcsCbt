/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#016f4a",
        secondary: "#e9fff7",
        grey: "#8A898D",
        darkgrey: "#797C86",
        yellow: "#F8BA18",
        cardgreen: "#016F4AB2",
        story: "#D5FAFC",
        footer: "#016F4A33"
      }
    },
  },
  plugins: [],
};
