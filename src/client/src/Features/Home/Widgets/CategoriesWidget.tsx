import { Text, HStack, Flex, Box } from "@chakra-ui/react";
import { useCategoryGetCategoriesQuery } from "../../Product/API/categoryAPI";

import { WidgetWrapper } from "./WidgetWrapper";

export function CategoriesWidget() {
  const { data: categories } = useCategoryGetCategoriesQuery();
  return (
    <WidgetWrapper>
      <Text size="xl">Check out our other categories</Text>
      <Flex overflowX={"scroll"}>
        <HStack p={2}>
          {categories?.map((cat) => (
            <CategoryItem key={`widget-category-${cat}`} />
          ))}
        </HStack>
      </Flex>
    </WidgetWrapper>
  );
}

function CategoryItem() {
  return <Box borderRadius={"lg"} w={150} h={135} bg="blue"></Box>;
}
