import { defineStyleConfig } from "@chakra-ui/react";

export const IconButton = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    px: "24px",
    py: "12px",
    //fontWeight: "bold",
    //textTransform: "uppercase",
    borderRadius: "full", // <-- border radius is same for all variants and sizes
  },

  variants: {
    outline: {
      border: "2px solid",
      borderColor: "purple.500",
      color: "purple.500",
    },
    solid: {
      bg: "purple.500",
      color: "white",
    },
    auth: {},
  },
  // The default size and variant values
  //defaultProps: {
  //  size: "md",
  //  variant: "outline",
  //},
});
