import React from "react";

import { Paper, Group, createStyles } from "@mantine/core";

interface WidgetWrapperProps {
  children: React.ReactNode;
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    padding: theme.spacing.md,
    boxShadow: theme.shadows.md,
    height: "100%",
    borderRadius: theme.radius.lg,
  },
}));
export function WidgetWrapper({ children }: WidgetWrapperProps) {
  const { classes } = useStyles();
  return (
    <>
      <Paper className={classes.wrapper}>{children}</Paper>
    </>
  );
}
