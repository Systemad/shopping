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
  Center,
} from "@mantine/core";
import { IconExternalLink, IconShoppingCart, IconX } from "@tabler/icons";
import { useCart } from "../Hooks/useCart";

export function ShoppingCartMenu() {
  const { cart, removeProductFromCart, totalCost } = useCart();

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
        {cart.length > 0 &&
          cart.map((item) => (
            <>
              <Group p="xs">
                <Avatar
                  src="https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"
                  size={"lg"}
                  radius="xs"
                />

                <div style={{ flex: 1 }}>
                  <Text>{item.productDetail.name}</Text>
                  <Text fz="xs">{item.productDetail.category}</Text>
                </div>
                <Text fz="sm">Quantity: {item.quantity}</Text>
                <ActionIcon
                  onClick={() =>
                    removeProductFromCart(item!.productDetail, item.quantity)
                  }
                >
                  <IconX size={18} />
                </ActionIcon>
              </Group>
              <Divider />
              <Group p="xs" position="apart">
                <Text>Total</Text>
                <Text>${totalCost}</Text>
              </Group>
              <Button fullWidth variant="filled">
                Checkout
              </Button>
            </>
          ))}

        {cart.length === 0 && (
          <Paper p={20} h={50}>
            <Center>
              <Text>Your cart is currently empty</Text>
            </Center>
          </Paper>
        )}
      </Popover.Dropdown>
    </Popover>
  );
}
