import { emptySplitApi as api } from "../../../redux/emptySplitApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    productGetProduct: build.query<
      ProductGetProductApiResponse,
      ProductGetProductApiArg
    >({
      query: (queryArg) => ({
        url: `/product/productId`,
        params: { productId: queryArg.productId },
      }),
    }),
    productGetProductsById: build.query<
      ProductGetProductsByIdApiResponse,
      ProductGetProductsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/product/productIds`,
        params: { productIds: queryArg.productIds },
      }),
    }),
    categoryGetCategories: build.query<
      CategoryGetCategoriesApiResponse,
      CategoryGetCategoriesApiArg
    >({
      query: () => ({ url: `/category/all` }),
    }),
    categoryGetItemsForCategory: build.query<
      CategoryGetItemsForCategoryApiResponse,
      CategoryGetItemsForCategoryApiArg
    >({
      query: (queryArg) => ({
        url: `/category/${queryArg.category}`,
        params: { limit: queryArg.limit },
      }),
    }),
    categoryGetItemsOfRandomCategory: build.query<
      CategoryGetItemsOfRandomCategoryApiResponse,
      CategoryGetItemsOfRandomCategoryApiArg
    >({
      query: (queryArg) => ({
        url: `/category/random`,
        params: { limit: queryArg.limit },
      }),
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
export type CategoryGetCategoriesApiResponse =
  /** status 200 A list of ProductCategory */ ProductCategory[];
export type CategoryGetCategoriesApiArg = void;
export type CategoryGetItemsForCategoryApiResponse =
  /** status 200 List of products */ ProductDetail[];
export type CategoryGetItemsForCategoryApiArg = {
  /** Enter a category to fetch items of */
  category: string;
  /** Enter amount, leave empty if default amount should be retrieved */
  limit?: number;
};
export type CategoryGetItemsOfRandomCategoryApiResponse =
  /** status 200 List of products */ ProductDetail[];
export type CategoryGetItemsOfRandomCategoryApiArg = {
  /** Enter amount, leave empty if default amount should be retrieved */
  limit?: number;
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
export const {
  useProductGetProductQuery,
  useProductGetProductsByIdQuery,
  useCategoryGetCategoriesQuery,
  useCategoryGetItemsForCategoryQuery,
  useCategoryGetItemsOfRandomCategoryQuery,
} = injectedRtkApi;
