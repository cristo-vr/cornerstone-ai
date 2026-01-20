import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "brand-black": "#0a0a0a",
                "brand-dark": "#121212",
                "brand-white": "#ffffff",
                "brand-gold": "#D4AF37",
                "brand-gray": "#a3a3a3",
            },
            // This allows you to use standard sans fonts if your design needs them
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;