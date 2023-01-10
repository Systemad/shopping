import { emptySplitApi as api } from "../../../redux/emptySplitApi";
export const addTagTypes = ["Product"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
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
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as productSpliApi };
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
};
export const { useProductGetProductQuery, useProductGetProductsByIdQuery } =
  injectedRtkApi;
