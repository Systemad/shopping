import {
  Menu,
  Button,
  ActionIcon,
  Box,
  Text,
  Popover,
  Divider,
  Image,
  Group,
  Stack,
  Paper,
  Avatar,
} from "@mantine/core";
import { IconExternalLink, IconShoppingCart } from "@tabler/icons";
import { useShoppingCartGetShoppingCart } from "../../../API/shopComponents";
import { CartItem } from "../../../API/shopSchemas";

export function ShoppingCartMenu() {
  const { data, error, isLoading } = useShoppingCartGetShoppingCart({});

  return (
    <Popover width={300} position="bottom" withArrow shadow="md" radius={"md"}>
      <Popover.Target>
        <ActionIcon size="xl" radius={"md"} variant="filled">
          <IconShoppingCart />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Text ta="center" size="md" mb="xs">
          Shopping cart
        </Text>
        <Divider />

        {data?.map((item) => (
          <ShoppingCartItem item={item} />
        ))}

        <Group p="xs" position="apart">
          <Text>Total: </Text>
          <Text>$999</Text>
        </Group>
        <Button fullWidth variant="filled">
          Checkout
        </Button>
      </Popover.Dropdown>
    </Popover>
  );
}

//  <ShoppingCartItem item={item} />
interface ShoppingCartItemProps {
  item?: CartItem;
}
function ShoppingCartItem({ item }: ShoppingCartItemProps) {
  return (
    <>
      <Group p="xs">
        <Avatar
          src="https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"
          size={"lg"}
          radius="xs"
        />

        <div style={{ flex: 1 }}>
          <Text>Name</Text>
          <Text fz="xs">Category</Text>
        </div>
        <Text fz="sm">Quantity: 2</Text>
      </Group>

      <Divider />
    </>
  );
}
