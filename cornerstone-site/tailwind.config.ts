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
                "background": "var(--background)",
                "foreground": "var(--foreground)",
                "primary": "var(--color-primary)",
                "surface": "var(--color-surface)",
                "muted": "var(--color-muted)",
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