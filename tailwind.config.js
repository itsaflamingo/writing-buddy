/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "default-profile-pic": "url('../images/defaultProfilePicture.png)",
      },
      fontFamily: {
        comfort: ["Comfortaa", "sans-serif"],
      },
      colors: {
        "black-ish": "#F5F8FA",
      },
    },
  },
  plugins: [],
};
