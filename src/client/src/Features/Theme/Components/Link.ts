import { defineStyleConfig } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";
import { palette } from "../Colors/colors";

export const Link = defineStyleConfig({
  variants: {
    navbar: (props: StyleFunctionProps) => ({
      px: "24px", // <-- px is short for paddingLeft and paddingRight
      py: "12px", // <-- py is short for paddingTop and paddingBottom
      fontSize: "lg",
      fontWeight: 600,
      borderRadius: "full",
      _activeLink: {
        bgColor: mode(palette.light.secondaryContainer, palette.dark.secondaryContainer)(props),
        borderRadius: "full",
        textColor: mode(palette.light.onSecondaryContainer, palette.dark.onSecondaryContainer)(props),
      },
      _hover: {
        bgColor: "red.800",
        borderRadius: "full",
      },
      //border: "2px solid",
      //borderColor: "purple.500",
      //color: "black",
    }),
  },
});
