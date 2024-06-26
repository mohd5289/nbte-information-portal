/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        table: "16rem", // Define spacing for table container
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      backgroundColor: ["hover"],
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.pdf$/,
      use: "file-loader",
    });
    return config;
  },
};
