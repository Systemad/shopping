import React from "react";

import { Paper, Group } from "@mantine/core";

interface WidgetWrapperProps {
  children: React.ReactNode;
}
export function WidgetWrapper({ children }: WidgetWrapperProps) {
  return (
    <>
      <Paper radius={"md"} h="100%" p={"xs"}>
        {children}
      </Paper>
    </>
  );
}
