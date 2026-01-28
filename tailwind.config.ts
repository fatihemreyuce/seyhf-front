import type { Config } from "tailwindcss"

const config = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/lib/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      keyframes: {
        "button-inner-expand": {
          "0%": {
            transform: "translateX(-50%) scaleX(0)",
          },
          "100%": {
            transform: "translateX(-50%) scaleX(1)",
          },
        },
        "underline-slide-in": {
          "0%": {
            transform: "scaleX(0)",
            transformOrigin: "left",
          },
          "100%": {
            transform: "scaleX(1)",
            transformOrigin: "left",
          },
        },
        "underline-slide-out": {
          "0%": {
            transform: "scaleX(1)",
            transformOrigin: "right",
          },
          "100%": {
            transform: "scaleX(0)",
            transformOrigin: "right",
          },
        },
        "slide-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-up": {
          "0%": {
            opacity: "1",
            transform: "translateY(0)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(-30px)",
          },
        },
        "icon-rotate": {
          "0%": {
            transform: "rotate(0deg) scale(1)",
            opacity: "1",
          },
          "50%": {
            transform: "rotate(90deg) scale(0.8)",
            opacity: "0.5",
          },
          "100%": {
            transform: "rotate(0deg) scale(1)",
            opacity: "1",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "fade-out": {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        "slide-from-bottom": {
          "0%": {
            opacity: "0",
            transform: "translateY(56px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "triangle-rotate": {
          "0%": { transform: "rotate(0deg) translateY(0)" },
          "25%": { transform: "rotate(90deg) translateY(-12px)" },
          "50%": { transform: "rotate(180deg) translateY(0)" },
          "75%": { transform: "rotate(270deg) translateY(-12px)" },
          "100%": { transform: "rotate(360deg) translateY(0)" },
        },
        "circle-float": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-24px) scale(1.06)" },
        },
        "shape-fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "button-inner-expand": "button-inner-expand 0.35s ease-out forwards",
        "underline-slide-in": "underline-slide-in 0.3s ease-out forwards",
        "underline-slide-out": "underline-slide-out 0.3s ease-out forwards",
        "slide-down": "slide-down 0.4s ease-in-out forwards",
        "slide-up": "slide-up 0.4s ease-in-out forwards",
        "fade-in": "fade-in 0.3s ease-out forwards",
        "fade-out": "fade-out 0.3s ease-out forwards",
        "icon-rotate": "icon-rotate 0.3s ease-in-out forwards",
        "slide-from-bottom": "slide-from-bottom 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "triangle-rotate": "triangle-rotate 10s linear infinite",
        "circle-float": "circle-float 4s ease-in-out infinite",
        "shape-fade-in": "shape-fade-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [],
} satisfies Config

export default config

