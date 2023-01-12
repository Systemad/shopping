import { showNotification } from "@mantine/notifications";
import { ProductDetail } from "../../Product/API/productAPI";
import {
  CartItem,
  useShoppingCartAddItemToCartMutation,
  useShoppingCartEmptyCartMutation,
  useShoppingCartGetShoppingCartQuery,
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
  const [addProduct] = useShoppingCartAddItemToCartMutation();
  const [removeProduct] = useShoppingCartAddItemToCartMutation();
  const [emptyCartMutation] = useShoppingCartEmptyCartMutation();

  const cost = cartItems?.reduce((sum: number, product: CartItem) => {
    sum += product.productDetail.price * product.quantity;
    return sum;
  }, 0);

  return {
    cart: cartItems ?? [],
    totalCost: cost,
    addProductToCart(product, quantity) {
      addProduct({ id: product!.id, quantity: quantity });
      showNotification({
        title: "Cart updated!",
        message: `${product?.name} has successfully been added to the cart`,
        radius: "md",
      });
    },
    removeProductFromCart(product, quantity) {
      removeProduct({ id: product!.id, quantity: quantity });
    },
    emptyCart() {
      emptyCartMutation();
    },
  };
}
