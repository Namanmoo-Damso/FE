/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#8FA963",
                    hover: "#7A9351",
                    dark: "#4A5D23",
                    light: "#D6E5BF",
                    soft: "#E9F0DF",
                },
                secondary: {
                    DEFAULT: "#6E7F4F",
                    soft: "#F7F9F2",
                    muted: "#7B8C5A",
                },
                background: "#F7F9F2",
                foreground: "#4A5D23",
                muted: {
                    DEFAULT: "#F1F6E8",
                    foreground: "#7B8C5A",
                },
                accent: {
                    DEFAULT: "#E9F0DF",
                    foreground: "#4A5D23",
                },
                card: {
                    DEFAULT: "#FFFFFF",
                    foreground: "#4A5D23",
                },
                destructive: {
                    DEFAULT: "#EF4444",
                    foreground: "#FFFFFF",
                },
            },
            borderRadius: {
                "3xl": "1.5rem",
                "4xl": "2rem",
            },
        },
    },
    plugins: [],
};
