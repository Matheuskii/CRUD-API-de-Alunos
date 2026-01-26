/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#6366f1", // Indigo 500
                "primary-dark": "#4338ca", // Indigo 700
                secondary: "#d946ef", // Fuchsia 500
                "secondary-dark": "#c026d3", // Fuchsia 700
                dark: "#0a0a0a", // Neutral 950
                "dark-light": "#171717", // Neutral 900
                "dark-lighter": "#262626", // Neutral 800
                glass: "rgba(23, 23, 23, 0.7)",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
