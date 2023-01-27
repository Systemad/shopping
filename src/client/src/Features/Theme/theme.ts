import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { StepsTheme as Steps } from "chakra-ui-steps";
import { Link } from "./Components/Link";
import { Button } from "./Components/Button";
import { cupcake } from "./Colors/cupcake";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const maintheme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "body",
        bg: cupcake["base-100"],
      },
    },
  },
  config,
  components: {
    Steps,
    Link,
    Button,
  },
});

export default maintheme;
