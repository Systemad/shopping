// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { StepsTheme as Steps } from "chakra-ui-steps";

const colors = {
  cupcake: {
    primary: "#65c3c8",
    secondary: "#ef9fbc",
    accent: "#eeaf3a",
    neutral: "#291334",
    base100: "#faf7f5",
    base200: "#efeae6",
    base300: "#e7e2df",
    altbase200: "#dbd4d4",
    primarycontent: "#291334",
    success: "#36d399",
    error: "#f87272",
    info: "#3abff8",
  },
};

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// 3. extend the theme
const maintheme = extendTheme({
  config,
  // colors,
  components: {
    Steps,
  },
});

export default maintheme;
