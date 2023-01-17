import { emptySplitApi as api } from "../../../redux/emptySplitApi";
export const addTagTypes = ["Promotion", "Product"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      promotionAddProductToPromotion: build.mutation<
        PromotionAddProductToPromotionApiResponse,
        PromotionAddProductToPromotionApiArg
      >({
        query: (queryArg) => ({
          url: `/promotion/add/${queryArg.promotionId}/${queryArg.productId}`,
          method: "POST",
        }),
        invalidatesTags: ["Promotion"],
      }),
      promotionRemoveProductFromPromotion: build.mutation<
        PromotionRemoveProductFromPromotionApiResponse,
        PromotionRemoveProductFromPromotionApiArg
      >({
        query: (queryArg) => ({
          url: `/promotion/remove/${queryArg.promotionId}/${queryArg.productId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Promotion"],
      }),
      productGetProduct: build.query<
        ProductGetProductApiResponse,
        ProductGetProductApiArg
      >({
        query: (queryArg) => ({
          url: `/product/productId`,
          params: { productId: queryArg.productId },
        }),
        providesTags: ["Product"],
      }),
      productGetProductsById: build.query<
        ProductGetProductsByIdApiResponse,
        ProductGetProductsByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/product/productIds`,
          params: { productIds: queryArg.productIds },
        }),
        providesTags: ["Product"],
      }),
      productCreateProduct: build.mutation<
        ProductCreateProductApiResponse,
        ProductCreateProductApiArg
      >({
        query: (queryArg) => ({
          url: `/product/create`,
          method: "POST",
          body: queryArg.productCreationDto,
        }),
        invalidatesTags: ["Product"],
      }),
      productDeleteProductById: build.mutation<
        ProductDeleteProductByIdApiResponse,
        ProductDeleteProductByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/product/delete/${queryArg.productId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Product"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as productSpliApi };
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
export type ProductGetProductApiResponse =
  /** status 200 A ProductDetail object */ ProductDetail;
export type ProductGetProductApiArg = {
  /** The ID of the product */
  productId?: string;
};
export type ProductGetProductsByIdApiResponse =
  /** status 200  */ ProductDetail[];
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
  usePromotionAddProductToPromotionMutation,
  usePromotionRemoveProductFromPromotionMutation,
  useProductGetProductQuery,
  useProductGetProductsByIdQuery,
  useProductCreateProductMutation,
  useProductDeleteProductByIdMutation,
} = injectedRtkApi;
