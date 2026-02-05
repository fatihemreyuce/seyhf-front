import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/lib/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        // Brand Colors - Mavi Tonları
        brand: {
          red: "#2563EB", // Ana mavi (eski kırmızı yerine)
          "red-hover": "#1D4ED8", // Koyu mavi hover
          "red-light": "#3B82F6", // Açık mavi
        },

        // Text Colors - Mavi Uyumlu Tonlar
        text: {
          primary: "#0F172A", // Lacivert-siyah
          secondary: "#1E293B", // Koyu lacivert
          tertiary: "#334155", // Orta lacivert
          muted: "#475569", // Soluk lacivert
          light: "#64748B", // Açık lacivert
          lighter: "#94A3B8", // Daha açık gri-mavi
          subtle: "#CBD5E1", // İnce mavi-gri
          "search-icon": "#3B4A5C", // Mavi-gri arama ikonu
        },

        // Background Colors - Mavi Tonlu Arka Planlar
        background: {
          primary: "#FFFFFF", // Beyaz
          secondary: "#F8FAFC", // Çok açık mavi-gri
          tertiary: "#F1F5F9", // Açık mavi-gri
          dark: "#1E293B", // Koyu lacivert
        },

        // Hero & Section Colors - Mavi Tonları
        hero: {
          gray: "#64748B", // Mavi-gri hero tonu
        },

        // UI Colors - Mavi-Gri Tonları
        /* Slider: mobil min-h; masaüstü (md+) yüksek hero — 850px / 95vh */
        height: {
          "slider-mobile": "280px",
          "slider-sm": "360px",
          slider: "850px",
          "slider-lg": "95vh",
        },
        minHeight: {
          "slider-mobile": "280px",
          "slider-sm": "360px",
          slider: "850px",
          touch: "44px",
        },
        gray: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#020617",
        },
      },
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
        "accordion-down": {
          "0%": {
            height: "0",
            opacity: "0",
            transform: "translateY(-6px)",
          },
          "100%": {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "accordion-up": {
          "0%": {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
            transform: "translateY(0)",
          },
          "100%": {
            height: "0",
            opacity: "0",
            transform: "translateY(-4px)",
          },
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
        "slide-from-bottom":
          "slide-from-bottom 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "triangle-rotate": "triangle-rotate 10s linear infinite",
        "circle-float": "circle-float 4s ease-in-out infinite",
        "shape-fade-in":
          "shape-fade-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "accordion-down":
          "accordion-down 2s cubic-bezier(0.33, 1, 0.68, 1) forwards",
        "accordion-up":
          "accordion-up 1.5s cubic-bezier(0.33, 1, 0.68, 1) forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
