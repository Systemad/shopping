// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { StepsTheme as Steps } from "chakra-ui-steps";
import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import { Link } from "./Components/Link";
import { palette } from "./Colors/colors";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// 3. extend the theme
const maintheme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        fontFamily: "body",
        //color: mode("#191c1c", "#e0e3e3")(props),
        bg: mode(palette.light.background, palette.dark.background)(props),
        //lineHeight: "base",
      },
    }),
  },
  config,
  components: {
    Steps,
    Link,
  },
});

export default maintheme;
