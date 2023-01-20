import { useToast } from "@chakra-ui/react";
import { ProductDetail } from "../../Product/API/productAPI";
import {
  CartItem,
  useShoppingCartAddItemToCartMutation,
  useShoppingCartEmptyCartMutation,
  useShoppingCartGetShoppingCartQuery,
  useShoppingCartRemoveItemFromCartMutation,
} from "../API/shoppingCartAPI";

type UseCart = {
  cart: CartItem[];
  totalCost?: number;
  addProductToCart: (product: ProductDetail, quantity: number) => void;
  removeProductFromCart: (product: ProductDetail, quantity: number) => void;
  emptyCart: () => void;
};

export function useCart(): UseCart {
  const { data: cartItems } = useShoppingCartGetShoppingCartQuery();
  const toast = useToast();
  const [addProduct] = useShoppingCartAddItemToCartMutation();
  const [removeProduct] = useShoppingCartRemoveItemFromCartMutation();
  const [emptyCartMutation] = useShoppingCartEmptyCartMutation();

  const cost = cartItems?.reduce((sum: number, product: CartItem) => {
    sum += product.productDetail.price * product.quantity;
    return +sum.toFixed(2);
  }, 0);

  return {
    cart: cartItems ?? [],
    totalCost: cost,
    addProductToCart(product, quantity) {
      addProduct({ id: product!.id, quantity: quantity });
      toast({
        title: "Cart updated!",
        description: "Product successfully added to cart!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    removeProductFromCart(product, quantity) {
      removeProduct({ id: product!.id, quantity: quantity });
      toast({
        title: "Cart updated!",
        description: "Product successfully removed from cart!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    emptyCart() {
      emptyCartMutation();
      toast({
        title: "Cart updated!",
        description: "Cart emptied",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
    },
  };
}
