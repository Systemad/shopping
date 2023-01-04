import {
  Paper,
  Text,
  Box,
  Center,
  Stack,
  Title,
  createStyles,
  Button,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconArrowRight } from "@tabler/icons";
import { DynamicTablerIcons } from "../../Components/DynamicTablerIcons";

interface CategoryCardProps {
  name: string;
}

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
    padding: theme.spacing.md,
    height: "250px",
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
    },
  },
}));

// TODO: Add Category Object, and subcategories
export function CategoryCard({ name }: CategoryCardProps) {
  const { classes, cx } = useStyles();
  const { hovered, ref } = useHover();
  return (
    <Paper ref={ref} className={cx(classes.card)}>
      <Center>
        <Stack>
          <Title mb="md" ta="center" fz="lg">
            {name}
          </Title>
          {hovered ? (
            <>
              Render sub category list
              <Button
                pos={"absolute"}
                bottom="0.5rem"
                right="0.5rem"
                radius={"md"}
                rightIcon={<IconArrowRight />}
              >
                View all products
              </Button>
            </>
          ) : (
            <>
              <DynamicTablerIcons iconName={name} size={100} />
            </>
          )}
        </Stack>
      </Center>
    </Paper>
  );
}
