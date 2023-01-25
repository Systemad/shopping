import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  IconButton,
  Text,
  Divider,
  Center,
  HStack,
  Avatar,
  Button,
  Box,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { IconShoppingCart, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Hooks/useCart";

export function ShoppingCartMenu() {
  const { cart, removeProductFromCart, totalCost } = useCart();
  const navigate = useNavigate();

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <IconButton
          p={3}
          //colorScheme={"teal"}
          borderWidth={1}
          borderColor={"gray.500"}
          aria-label="shoppingcart-button"
          size="xl"
          borderRadius={"full"}
          icon={<IconShoppingCart />}
          //variant="filled"
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <Text align={"center"} size="md" mb="xs">
            Shopping cart
          </Text>
        </PopoverHeader>
        <PopoverBody>
          {cart.length === 0 && (
            <Center>
              <Text>Your cart is currently empty</Text>
            </Center>
          )}
          {cart.length > 0 &&
            cart.map((item) => (
              <>
                <HStack p="xs">
                  <Avatar src={item.productDetail.imageUrl} size={"lg"} borderRadius={"md"} />

                  <Flex>
                    <Text>{item.productDetail.name}</Text>
                    <HStack>
                      <Text size="xs">{item.productDetail.category}</Text>
                      <Text size="xs">${item.productDetail.price}</Text>
                    </HStack>
                  </Flex>
                  <HStack>
                    <Text size="sm">Quantity: {item.quantity}</Text>
                    <IconButton
                      aria-label="remove-item"
                      icon={<IconX size={18} />}
                      onClick={() => removeProductFromCart(item.productDetail, item.quantity)}
                    />
                  </HStack>
                </HStack>
              </>
            ))}
        </PopoverBody>
        <PopoverFooter>
          {cart.length > 0 && (
            <>
              <HStack p="xs" align="stretch">
                <Text>Total</Text>
                <Text>${totalCost}</Text>
              </HStack>
              <Button onClick={() => navigate("checkout")} w="100%" variant="filled">
                Checkout
              </Button>
            </>
          )}
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
