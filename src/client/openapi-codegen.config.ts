import {
  generateSchemaTypes,
  generateReactQueryFunctions,
  generateReactQueryComponents,
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
export default defineConfig({
  shop: {
    from: {
      relativePath: "./swagger.json",
      source: "file",
    },
    outputDir: "src/API",
    to: async (context) => {
      const filenamePrefix = "shop";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });

      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
      /*
      await generateReactQueryFunctions(context, {
        filenamePrefix,
        schemasFiles,
      });
      */
    },
  },
});
