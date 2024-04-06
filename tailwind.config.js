/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        black: "#09090B",
        white: "#F4F4F6",
        violet: "#2F27CE",
      },
      fontFamily: {
        poppins: "Poppins",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    // base: false,
    // darkTheme: "light",
    // themes: [],
    themeRoot: ".components",
  },
};
