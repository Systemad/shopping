import { defineStyleConfig, defineStyle } from "@chakra-ui/react";
import { palette } from "../Colors/colors";
import { cupcake } from "../Colors/cupcake";

const navLink = defineStyle({
  px: "24px",
  py: "12px",
  fontSize: "lg",
  fontWeight: 600,
  borderRadius: "full",

  color: cupcake.neutral,

  _activeLink: {
    bgColor: cupcake.primary,
    color: cupcake["primary-content"],
  },
  _hover: {
    bgColor: "#65c3c833",
    textDecoration: "none",
  },
});

export const Link = defineStyleConfig({
  baseStyle: {
    textDecoration: "none",
  },
  variants: {
    navLink,
  },
});
