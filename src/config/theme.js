import React from "react";
import { theme } from "@chakra-ui/core";

// https://smart-swatch.netlify.com/
// https://colors.eva.design/

const customIcons = {
  dots: {
    path: (
      <g fill="currentColor">
        <circle cx="2.5" cy="10.5" r="2.5" />
        <circle cx="11" cy="10.5" r="2.5" />
        <circle cx="19.5" cy="10.5" r="2.5" />
      </g>
    ),
    viewBox: "0 0 22 22"
  },
  pencil: {
    path: (
      <>
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path
          fillRule="evenodd"
          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
          clipRule="evenodd"
        />
      </>
    ),
    viewBox: "0 0 20 20"
  },
  cloud: {
    path: (
      <path
        fill="currentColor"
        d="M22 13.3c0 2.6-2.1 4.7-4.7 4.7H3.6c-2 0-3.6-1.6-3.6-3.6s1.6-3.6 3.6-3.6c0-3.8 3.1-6.9 6.9-6.9 3.1 0 5.7 2 6.5 4.8h.3c2.6 0 4.7 2 4.7 4.6z"
      ></path>
    ),
    viewBox: "0 0 22 22"
  },
  github: {
    path: (
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M16.3 0a16.3 16.3 0 00-5.2 31.8c.8.1 1.1-.4 1.1-.8v-2.8c-4.5 1-5.5-2.2-5.5-2.2-.7-1.9-1.8-2.4-1.8-2.4-1.5-1 .1-1 .1-1 1.6.1 2.5 1.7 2.5 1.7 1.5 2.5 3.8 1.8 4.7 1.4.1-1.1.6-1.8 1-2.2-3.6-.4-7.4-1.8-7.4-8.1 0-1.8.6-3.2 1.7-4.4-.1-.3-.7-2 .2-4.2 0 0 1.4-.4 4.5 1.7a18.4 18.4 0 018.2 0c3.1-2.1 4.5-1.7 4.5-1.7.9 2.2.3 3.9.2 4.3 1 1.1 1.7 2.6 1.7 4.4 0 6.3-3.8 7.6-7.4 8 .6.5 1.1 1.5 1.1 3V31c0 .4.3.9 1.1.8A16.3 16.3 0 0016.3 0z"
        clipRule="evenodd"
      ></path>
    ),
    viewBox: "0 0 32.6 31.8"
  }
};

export default {
  ...theme,
  icons: {
    ...theme.icons,
    ...customIcons
  },
  fontSizes: {
    xs: "0.68rem",
    sm: "0.8rem",
    md: "0.875rem",
    lg: "1rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "4rem"
  },
  fontWeights: {
    hairline: 400,
    thin: 400,
    light: 400,
    normal: 400,
    medium: 400,
    semibold: 600,
    bold: 700,
    extrabold: 700,
    black: 700
  },
  colors: {
    ...theme.colors,
    blue: {
      50: "#def6ff",
      100: "#CFF6FD",
      200: "#A0E7FC",
      300: "#70D1F7",
      400: "#4CB7F0",
      500: "#1592E6",
      600: "#0F71C5",
      700: "#0A55A5",
      800: "#063C85",
      900: "#042A6E"
    },
    dark: {
      50: "#e8f3ff",
      100: "#cddae4",
      200: "#b3c0cd",
      300: "#96a6b6",
      400: "#798d9f",
      500: "#607386",
      600: "#495a69",
      700: "#33404c",
      800: "#1c2631",
      900: "#010e18"
    }
  },
  fonts: {
    body: "'Open Sans', system-ui, sans-serif",
    heading: "'Open Sans', system-ui, sans-serif",
    mono: "Menlo, monospace"
  }
};
