import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "./swagger.json",
  apiFile: "./src/redux/emptySplitApi.ts",
  apiImport: "emptySplitApi",
  outputFiles: {
    "./src/Features/ShoppingCart/API/shoppingCartAPI.ts": {
      filterEndpoints: [/shopping-cart/i],
      exportName: "shoppingCartSplitApi",
    },
    "./src/Features/Product/API/productAPI.ts": {
      filterEndpoints: [/product/i, /category/i],
      exportName: "productSpliApi",
    },
  },
  hooks: true,
};

export default config;

/*
src\Features\ShoppingCart
    "./src/Features/Category/API/categoryAPI.ts": {
      filterEndpoints: [/category/i],
      exportName: "categorySplitApi",
    },
*/
