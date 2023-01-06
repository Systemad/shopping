import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  Button,
  Paper,
  ActionIcon,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconHeart } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { ProductDetail } from "../../../API/shopSchemas";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: -0.25,
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: 5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

interface ProductCardProps {
  product: ProductDetail;
}

export function ProductCard({ product }: ProductCardProps) {
  const { classes } = useStyles();

  const navigate = useNavigate();

  const [lastVisitedIds, setLastVisitedids] = useLocalStorage<string[]>({
    key: "last-visisted",
  });

  const navigateTo = () => {
    setLastVisitedids([...lastVisitedIds, product.id]);
    navigate(product.id);
  };

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src={product.imageUrl} alt={product.name} />
      </Card.Section>

      <Group position="apart" mt="xs">
        <Text weight={500}>{product.name}</Text>
        <Text size="xl" weight={700} sx={{ lineHeight: 2 }}>
          ${product.price}
        </Text>
        <Badge variant="outline">25% off</Badge>
      </Group>

      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <Button radius="xl" style={{ flex: 1 }}>
            Add to cart
          </Button>
          <ActionIcon color="red" size="xl" radius="xl" variant="transparent">
            <IconHeart size={34} />
          </ActionIcon>
        </Group>
      </Card.Section>
    </Card>
  );
}
