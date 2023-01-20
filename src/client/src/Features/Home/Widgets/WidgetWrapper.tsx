import { Box } from "@chakra-ui/react";
import React from "react";

interface WidgetWrapperProps {
  children: React.ReactNode;
}

export function WidgetWrapper({ children }: WidgetWrapperProps) {
  return <Box>{children}</Box>;
}
