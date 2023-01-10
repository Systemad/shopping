import { CartItem } from "../../ShoppingCart/API/shoppingCartAPI";

export const GetCartTotoal = (cartItems?: CartItem[]) => {
  const totalCost = cartItems?.reduce((sum: number, product: CartItem) => {
    sum += product.productDetail.price * product.quantity;
    return sum;
  }, 0);

  return totalCost;
};
