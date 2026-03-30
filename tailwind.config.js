/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  
    screens: {
      sm: "480px", // phones
      md: "640px", // small tablets
      lg: "960px", // laptops
      xl: "1200px", // desktops
      "2xl": "1440px", // large screens
    },
    extend: {
      fontFamily: {
        druk: ["var(--font-druk)"],
        portrait: ["var(--font-portrait)"],
        canela: ["var(--font-canela)"],
        inter: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        playfair: ["var(--font-playfair)"],
      },
    },
  },
  plugins: [],
};
