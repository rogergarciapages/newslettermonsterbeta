import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        danger: {
          "50": "#fff0f3",
          "100": "#ffdde4",
          "200": "#ffc0ce",
          "300": "#ff94ab",
          "400": "#ff577b",
          "500": "#ff2353",
          "600": "#fa0036",
          "700": "#d7002e",
          "800": "#b10329",
          "900": "#920a27",
          "950": "#500011"
        },
        torch: {
          "50": "#fff0f3",
          "100": "#ffdde4",
          "200": "#ffc0ce",
          "300": "#ff94ab",
          "400": "#ff577b",
          "500": "#ff2353",
          "600": "#fa0036",
          "700": "#d7002e",
          "800": "#b10329",
          "900": "#920a27",
          "950": "#500011"
        },
        indigo: {
          "50": "#f1f8fa",
          "100": "#dbecf2",
          "200": "#bcd9e5",
          "300": "#8dbed3",
          "400": "#6ca6c1",
          "500": "#3c7e9e",
          "600": "#356785",
          "700": "#30566e",
          "800": "#2e485c",
          "900": "#2a3e4f",
          "950": "#182734"
        },
        daisy: {
          "50": "#fefde8",
          "100": "#fffdc2",
          "200": "#fff66d",
          "300": "#ffec45",
          "400": "#fcdb13",
          "500": "#ecc206",
          "600": "#cc9702",
          "700": "#a26b06",
          "800": "#86540d",
          "900": "#724511",
          "950": "#432405"
        },
        space: {
          "50": "#f4f7f7",
          "100": "#e3e9ea",
          "200": "#cbd5d6",
          "300": "#a7b7b9",
          "400": "#7b9295",
          "500": "#60767a",
          "600": "#526468",
          "700": "#475457",
          "800": "#3f484b",
          "900": "#383f41",
          "950": "#2c3336"
        },
        aquamarine: {
          "50": "#e9fff8",
          "100": "#c9ffed",
          "200": "#98ffe1",
          "300": "#44ffd1",
          "400": "#14f3c4",
          "500": "#00dbad",
          "600": "#00b38f",
          "700": "#008f77",
          "800": "#00715f",
          "900": "#005c50",
          "950": "#00342e"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))"
        }
      },
      fontSize: {
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "6xl": ["4rem", { lineHeight: "1" }],
        "5xl": ["3.5rem", { lineHeight: "1" }],
        "4xl": ["3rem", { lineHeight: "1" }],
        "3xl": ["2.5rem", { lineHeight: "1.2" }],
        "2xl": ["2rem", { lineHeight: "1.3" }],
        "xl": ["1.75rem", { lineHeight: "1.4" }],
        "lg": ["1.5rem", { lineHeight: "1.5" }],
        "base": ["1rem", { lineHeight: "1.6" }],
        "sm": ["0.875rem", { lineHeight: "1.6" }],
        "xs": ["0.75rem", { lineHeight: "1.6" }],
        "2xs": ["0.625rem", { lineHeight: "1.6" }],
        "3xs": ["0.5rem", { lineHeight: "1.6" }],
        "4xs": ["0.375rem", { lineHeight: "1.6" }]
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      animation: {
        move: "move 5s linear infinite"
      },
      keyframes: {
        move: {
          "0%": {
            transform: "translateX(-200px)"
          },
          "100%": {
            transform: "translateX(200px)"
          }
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  darkMode: ["class"], // Fixed duplicate value
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    nextui(),
    require("tailwindcss-animate")
  ],
};

export default config;