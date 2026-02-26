import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'poppins' : ["Poppins", 'sans-serif'],
      'arab' : ["LPMQ", 'sans-serif'],
      'id' : ["Lato", 'sans-serif']
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mint: {
          primary: 'rgba(2, 152, 154, 1)',
          secondary: 'rgba(2, 152, 154, 0.1)'
        },
        black: {
          primary: '#333',
          secondary: '#888'
        },
      },
      boxShadow: {
        'smooth': '4px 4px 38px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
};
export default config;
