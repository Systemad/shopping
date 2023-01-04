import { useState } from "react";
import {
  createStyles,
  Container,
  Group,
  Box,
  Breadcrumbs,
  Anchor,
} from "@mantine/core";
import { SwitchToggle } from "../Theme/SwitchToggle";
import { Link } from "react-router-dom";
const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.md,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.lg,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

export interface HeaderLink {
  link: string;
  label: string;
}

interface MainHeaderProps {
  links: HeaderLink[];
}

const MainHeader = ({ links }: MainHeaderProps) => {
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <Box
      key={link.label}
      component={Link}
      to={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={(event) => {
        //event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </Box>
  ));

  const breadcrum = links.map((item, index) => (
    <Anchor href={item.link} key={index}>
      {item.label}
    </Anchor>
    //<Breadcrumbs>{breadcrum}</Breadcrumbs>
  ));

  return (
    <Container className={classes.header}>
      <Group mr="lg" spacing={5} className={classes.links}>
        {items}
      </Group>
      <SwitchToggle />
    </Container>
  );
};

export default MainHeader;
