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
        filenameCase: "camel",
      });

      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
        //filenameCase: "camel",
      });
      await generateReactQueryFunctions(context, {
        filenamePrefix,
        schemasFiles,
        //filenameCase: "camel",
      });
    },
  },
});
