import { emptySplitApi as api } from "../../../redux/emptySplitApi";
export const addTagTypes = ["Wishlist", "Promotion", "Product"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      wishlistAddProductToWishlist: build.mutation<
        WishlistAddProductToWishlistApiResponse,
        WishlistAddProductToWishlistApiArg
      >({
        query: (queryArg) => ({ url: `/v1/wishlist/add/${queryArg.productId}`, method: "POST" }),
        invalidatesTags: ["Wishlist"],
      }),
      wishlistRemoveProductFromWishlist: build.mutation<
        WishlistRemoveProductFromWishlistApiResponse,
        WishlistRemoveProductFromWishlistApiArg
      >({
        query: (queryArg) => ({ url: `/v1/wishlist/remove/${queryArg.productId}`, method: "DELETE" }),
        invalidatesTags: ["Wishlist"],
      }),
      promotionAddProductToPromotion: build.mutation<
        PromotionAddProductToPromotionApiResponse,
        PromotionAddProductToPromotionApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/promotion/add/${queryArg.promotionId}/${queryArg.productId}`,
          method: "POST",
        }),
        invalidatesTags: ["Promotion"],
      }),
      promotionRemoveProductFromPromotion: build.mutation<
        PromotionRemoveProductFromPromotionApiResponse,
        PromotionRemoveProductFromPromotionApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/promotion/remove/${queryArg.promotionId}/${queryArg.productId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Promotion"],
      }),
      productGetProduct: build.query<ProductGetProductApiResponse, ProductGetProductApiArg>({
        query: (queryArg) => ({ url: `/v1/product/productId`, params: { productId: queryArg.productId } }),
        providesTags: ["Product"],
      }),
      productGetProductsById: build.query<ProductGetProductsByIdApiResponse, ProductGetProductsByIdApiArg>({
        query: (queryArg) => ({ url: `/v1/product/productIds`, params: { productIds: queryArg.productIds } }),
        providesTags: ["Product"],
      }),
      productCreateProduct: build.mutation<ProductCreateProductApiResponse, ProductCreateProductApiArg>({
        query: (queryArg) => ({ url: `/v1/product/create`, method: "POST", body: queryArg.productCreationDto }),
        invalidatesTags: ["Product"],
      }),
      productDeleteProductById: build.mutation<ProductDeleteProductByIdApiResponse, ProductDeleteProductByIdApiArg>({
        query: (queryArg) => ({ url: `/v1/product/delete/${queryArg.productId}`, method: "DELETE" }),
        invalidatesTags: ["Product"],
      }),
      productUpdateProduct: build.mutation<ProductUpdateProductApiResponse, ProductUpdateProductApiArg>({
        query: (queryArg) => ({
          url: `/v1/product/update`,
          method: "PUT",
          params: {
            Id: queryArg.id,
            Name: queryArg.name,
            Description: queryArg.description,
            Category: queryArg.category,
            Quantity: queryArg.quantity,
            Price: queryArg.price,
            ImageUrl: queryArg.imageUrl,
            CreatedAt: queryArg.createdAt,
          },
        }),
        invalidatesTags: ["Product"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as productSpliApi };
export type WishlistAddProductToWishlistApiResponse = unknown;
export type WishlistAddProductToWishlistApiArg = {
  productId: string;
};
export type WishlistRemoveProductFromWishlistApiResponse = unknown;
export type WishlistRemoveProductFromWishlistApiArg = {
  productId: string;
};
export type PromotionAddProductToPromotionApiResponse = unknown;
export type PromotionAddProductToPromotionApiArg = {
  promotionId: string;
  productId: string;
};
export type PromotionRemoveProductFromPromotionApiResponse = unknown;
export type PromotionRemoveProductFromPromotionApiArg = {
  promotionId: string;
  productId: string;
};
export type ProductGetProductApiResponse = /** status 200 A ProductDetail object */ ProductDetail;
export type ProductGetProductApiArg = {
  /** The ID of the product */
  productId?: string;
};
export type ProductGetProductsByIdApiResponse = /** status 200  */ ProductDetail[];
export type ProductGetProductsByIdApiArg = {
  productIds?: string[];
};
export type ProductCreateProductApiResponse = unknown;
export type ProductCreateProductApiArg = {
  productCreationDto: ProductCreationDto;
};
export type ProductDeleteProductByIdApiResponse = unknown;
export type ProductDeleteProductByIdApiArg = {
  productId: string;
};
export type ProductUpdateProductApiResponse = unknown;
export type ProductUpdateProductApiArg = {
  id?: string;
  name?: string;
  description?: string;
  category?: "Accessories" | "Hardware" | "Software" | "Books" | "Movies" | "Music" | "Games" | "Other";
  quantity?: number;
  price?: number;
  imageUrl?: string;
  createdAt?: string;
};
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
export type ProductCreationDto = {
  name: string;
  description: string;
  category: ProductCategory;
  quantity: number;
  price: number;
  imageUrl: string;
};
export const {
  useWishlistAddProductToWishlistMutation,
  useWishlistRemoveProductFromWishlistMutation,
  usePromotionAddProductToPromotionMutation,
  usePromotionRemoveProductFromPromotionMutation,
  useProductGetProductQuery,
  useProductGetProductsByIdQuery,
  useProductCreateProductMutation,
  useProductDeleteProductByIdMutation,
  useProductUpdateProductMutation,
} = injectedRtkApi;
