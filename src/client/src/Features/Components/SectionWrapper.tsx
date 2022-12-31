import React from "react";

import { Paper, Group } from "@mantine/core";

interface SectionWrapperProps {
  children: React.ReactNode;
}
export function SectionWrapper({ children }: SectionWrapperProps) {
  return (
    <>
      <Paper radius={"md"} h="100%" p={"xs"}>
        {children}
      </Paper>
    </>
  );
}

export default SectionWrapper;
