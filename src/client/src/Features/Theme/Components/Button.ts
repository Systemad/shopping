import { defineStyleConfig } from "@chakra-ui/react";
import { defineStyle } from "@chakra-ui/styled-system";
import { palette } from "../Colors/colors";
import { cupcake } from "../Colors/cupcake";

const iconUtil = defineStyle({
  border: "1px solid",
  borderWidth: 1,
  borderColor: palette.light.outline,

  _dark: {
    borderColor: palette.dark.outline,
  },
});

const auth = defineStyle({
  fontSize: "lg",
  fontWeight: 600,
  bgColor: cupcake.primary,
  color: cupcake["primary-content"],
  _hover: {
    bgColor: "#65c3c833",
    textDecoration: "none",
  },
});

export const Button = defineStyleConfig({
  baseStyle: {
    px: "24px",
    py: "12px",
    borderRadius: "full",
    size: "xl",
  },

  variants: {
    auth,
    iconUtil,
  },
});
