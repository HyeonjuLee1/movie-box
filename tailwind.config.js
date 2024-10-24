/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1b1b1b",
        "primary-light": "#232323",
        "text-primary": "#FFFFFF",
        secondary: "#a5a5a5",
      },
    },
  },
  plugins: [],
};
