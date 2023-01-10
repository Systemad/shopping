import { emptySplitApi as api } from "../../../redux/emptySplitApi";
export const addTagTypes = ["Category"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      categoryGetCategories: build.query<
        CategoryGetCategoriesApiResponse,
        CategoryGetCategoriesApiArg
      >({
        query: () => ({ url: `/category/all` }),
        providesTags: ["Category"],
      }),
      categoryGetItemsForCategory: build.query<
        CategoryGetItemsForCategoryApiResponse,
        CategoryGetItemsForCategoryApiArg
      >({
        query: (queryArg) => ({
          url: `/category/${queryArg.category}`,
          params: { limit: queryArg.limit },
        }),
        providesTags: ["Category"],
      }),
      categoryGetItemsOfRandomCategory: build.query<
        CategoryGetItemsOfRandomCategoryApiResponse,
        CategoryGetItemsOfRandomCategoryApiArg
      >({
        query: (queryArg) => ({
          url: `/category/random`,
          params: { limit: queryArg.limit },
        }),
        providesTags: ["Category"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as productSpliApi };
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
  useCategoryGetCategoriesQuery,
  useCategoryGetItemsForCategoryQuery,
  useCategoryGetItemsOfRandomCategoryQuery,
} = injectedRtkApi;
