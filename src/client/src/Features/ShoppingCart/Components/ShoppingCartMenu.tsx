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
import { useNavigate } from "react-router-dom";
import { useCart } from "../Hooks/useCart";

export function ShoppingCartMenu() {
  const { cart, removeProductFromCart, totalCost } = useCart();
  const navigate = useNavigate();

  return (
    <Popover width={500} position="bottom" withArrow shadow="md" radius={"md"}>
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
                  src={item.productDetail.imageUrl}
                  size={"lg"}
                  radius="xs"
                />

                <div style={{ flex: 1 }}>
                  <Text>{item.productDetail.name}</Text>
                  <Group>
                    <Text fz="xs">{item.productDetail.category}</Text>
                    <Text weight={650} fz="xs">
                      ${item.productDetail.price}
                    </Text>
                  </Group>
                </div>
                <Group>
                  <Text fz="sm">Quantity: {item.quantity}</Text>
                  <ActionIcon
                    onClick={() =>
                      removeProductFromCart(item.productDetail, item.quantity)
                    }
                  >
                    <IconX size={18} />
                  </ActionIcon>
                </Group>
              </Group>
            </>
          ))}
        <Divider />
        <Group p="xs" position="apart">
          <Text>Total</Text>
          <Text>${totalCost}</Text>
        </Group>
        <Button onClick={() => navigate("checkout")} fullWidth variant="filled">
          Checkout
        </Button>

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
