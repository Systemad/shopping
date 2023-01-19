import { emptySplitApi as api } from "../../../redux/emptySplitApi";
export const addTagTypes = ["ShoppingCart"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      shoppingCartGetShoppingCart: build.query<
        ShoppingCartGetShoppingCartApiResponse,
        ShoppingCartGetShoppingCartApiArg
      >({
        query: () => ({ url: `/cart/all` }),
        providesTags: ["ShoppingCart"],
      }),
      shoppingCartAddItemToCart: build.mutation<
        ShoppingCartAddItemToCartApiResponse,
        ShoppingCartAddItemToCartApiArg
      >({
        query: (queryArg) => ({
          url: `/cart/add/${queryArg.id}/${queryArg.quantity}`,
          method: "POST",
        }),
        invalidatesTags: ["ShoppingCart"],
      }),
      shoppingCartRemoveItemFromCart: build.mutation<
        ShoppingCartRemoveItemFromCartApiResponse,
        ShoppingCartRemoveItemFromCartApiArg
      >({
        query: (queryArg) => ({
          url: `/cart/remove/${queryArg.id}/${queryArg.quantity}`,
          method: "DELETE",
        }),
        invalidatesTags: ["ShoppingCart"],
      }),
      shoppingCartEmptyCart: build.mutation<
        ShoppingCartEmptyCartApiResponse,
        ShoppingCartEmptyCartApiArg
      >({
        query: () => ({ url: `/cart/empty`, method: "POST" }),
        invalidatesTags: ["ShoppingCart"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as shoppingCartSplitApi };
export type ShoppingCartGetShoppingCartApiResponse =
  /** status 200 A list of clients items in shopping cart */ CartItem[];
export type ShoppingCartGetShoppingCartApiArg = void;
export type ShoppingCartAddItemToCartApiResponse = unknown;
export type ShoppingCartAddItemToCartApiArg = {
  id: string;
  quantity: number;
};
export type ShoppingCartRemoveItemFromCartApiResponse = unknown;
export type ShoppingCartRemoveItemFromCartApiArg = {
  id: string;
  quantity: number;
};
export type ShoppingCartEmptyCartApiResponse = unknown;
export type ShoppingCartEmptyCartApiArg = void;
export type ProductCategory =
  | "Accessories"
  | "Hardware"
  | "Software"
  | "Books"
  | "Movies"
  | "Music"
  | "Games"
  | "Other";
export type ProductDetail = {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  quantity: number;
  price: number;
  imageUrl: string;
  createdAt: string;
};
export type CartItem = {
  userId: string;
  quantity: number;
  productDetail: ProductDetail;
};
export const {
  useShoppingCartGetShoppingCartQuery,
  useShoppingCartAddItemToCartMutation,
  useShoppingCartRemoveItemFromCartMutation,
  useShoppingCartEmptyCartMutation,
} = injectedRtkApi;
