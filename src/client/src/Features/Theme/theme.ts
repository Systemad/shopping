// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { StepsTheme as Steps } from "chakra-ui-steps";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// 3. extend the theme
const maintheme = extendTheme({
  config,
  components: {
    Steps,
  },
});

export default maintheme;
