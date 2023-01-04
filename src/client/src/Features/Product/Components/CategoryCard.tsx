import {
  Paper,
  Text,
  Box,
  Center,
  Stack,
  Title,
  createStyles,
} from "@mantine/core";
import { DynamicTablerIcons } from "../../Components/DynamicTablerIcons";

interface CategoryCardProps {
  name: string;
}

const useStyles = createStyles((theme) => ({
  card: {
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
    },
  },
}));

// Add: hover will display sub categories
export function CategoryCard({ name }: CategoryCardProps) {
  const { classes, cx } = useStyles();
  return (
    <Paper
      className={cx(classes.card)}
      h="250px"
      shadow={"md"}
      p="md"
      radius={"md"}
    >
      <Center>
        <Stack>
          <Title mb="md" ta="center" fz="lg">
            {name}
          </Title>
          <DynamicTablerIcons iconName={name} size={100} />
        </Stack>
      </Center>
    </Paper>
  );
}
