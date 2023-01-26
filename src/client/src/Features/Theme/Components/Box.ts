import { defineStyleConfig } from "@chakra-ui/react";

export const Box = defineStyleConfig({
  variants: {
    material3: {
      px: "24px", // <-- px is short for paddingLeft and paddingRight
      py: "12px", // <-- py is short for paddingTop and paddingBottom
      fontSize: "lg",
      fontWeight: 600,
      borderRadius: "full",
      //border: "2px solid",
      //borderColor: "purple.500",
      //color: "black",
    },
  },
});
