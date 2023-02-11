import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "./swagger.json",
  apiFile: "./src/redux/emptySplitApi.ts",
  apiImport: "emptySplitApi",
  outputFiles: {
    "./src/Features/ShoppingCart/API/shoppingCartAPI.ts": {
      filterEndpoints: [/cart/i],
      exportName: "shoppingCartSplitApi",
      tag: true,
    },
    "./src/Features/Product/API/productAPI.ts": {
      filterEndpoints: [/product/i],
      exportName: "productSpliApi",
      tag: true,
    },
    "./src/Features/Product/API/categoryAPI.ts": {
      filterEndpoints: [/category/i],
      exportName: "productSpliApi",
      tag: true,
    },
  },
  hooks: true,
};

export default config;
