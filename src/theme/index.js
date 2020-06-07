import { theme } from "@chakra-ui/core";
import customIcons from "./icons";

export default {
  ...theme,
  icons: {
    ...theme.icons,
    ...customIcons
  },
  shadows: {
    ...theme.shadows,
    sm: "0 0 1px #ececed, 0 1px 3px 0 rgba(41, 71, 98, 0.1)"
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
    hairline: 300,
    thin: 300,
    light: 300,
    normal: 400,
    medium: 400,
    semibold: 600,
    bold: 700,
    extrabold: 700,
    black: 700
  },
  colors: {
    ...theme.colors,
    gray: {
      ...theme.colors.gray,
      500: "#67768e" // contrasct ratio
    },
    primary: {
      50: "#ffe2ea",
      100: "#ffb2c4",
      200: "#ff7f9d",
      300: "#fe4e75",
      400: "#fc1d4e",
      500: "#dd0333",
      600: "#b10029",
      700: "#7f001c",
      800: "#4e000f",
      900: "#200005"
    },
    teal: {
      50: "#dbfdff",
      100: "#b5f0f8",
      200: "#8be6ef",
      300: "#60dae8",
      400: "#38d0e1",
      500: "#1eb6c7",
      600: "#0e8e9c",
      700: "#006670",
      800: "#003e44",
      900: "#00161a"
    },
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
    body: "'Inter', system-ui, sans-serif",
    heading: "'Inter', system-ui, sans-serif",
    mono: "Menlo, monospace"
  }
};
