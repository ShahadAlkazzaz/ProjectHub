/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          "light-pink": "#EDAFB8",
          "light-beige": "#F7E1D7",
          "beige-gray": "#DEDBD2",
          "soft-green": "#B0C4B1",
          "dark-gray": "#4A5759",
        }
      },
    },
    plugins: [],
  };
