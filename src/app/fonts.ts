import localFont from "next/font/local";

// Font Awesome Brands
export const faBrands = localFont({
  src: [
    {
      path: "./assets/font/fa-brands-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/font/fa-brands-400.woff",
      weight: "400",
      style: "normal",
    },
  ],
  preload: true,
  display: "swap",
  variable: "--font-fa-brands",
});

// Font Awesome Solid
export const faSolid = localFont({
  src: [
    {
      path: "./assets/font/fa-solid-900.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./assets/font/fa-solid-900.woff",
      weight: "900",
      style: "normal",
    },
  ],
  preload: true,
  display: "swap",
  variable: "--font-fa-solid",
});

// Font Awesome Regular
export const faRegular = localFont({
  src: [
    {
      path: "./assets/font/fa-regular-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/font/fa-regular-400.woff",
      weight: "400",
      style: "normal",
    },
  ],
  preload: true,
  display: "swap",
  variable: "--font-fa-regular",
});

// Font Awesome Light
export const faLight = localFont({
  src: [
    {
      path: "./assets/font/fa-light-300.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./assets/font/fa-light-300.woff",
      weight: "300",
      style: "normal",
    },
  ],
  preload: true,
  display: "swap",
  variable: "--font-fa-light",
});

// Font Awesome Duotone
export const faDuotone = localFont({
  src: [
    {
      path: "./assets/font/fa-duotone-900.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./assets/font/fa-duotone-900.woff",
      weight: "900",
      style: "normal",
    },
  ],
  preload: true,
  display: "swap",
  variable: "--font-fa-duotone",
});
