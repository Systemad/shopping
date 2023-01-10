import { Text, Paper, Box, Group, ScrollArea } from "@mantine/core";
import { useCategoryGetCategoriesQuery } from "../../Product/API/categoryAPI";

import { WidgetWrapper } from "./WidgetWrapper";

export function CategoriesWidget() {
  const { data: categories } = useCategoryGetCategoriesQuery();
  return (
    <WidgetWrapper>
      <Text fz="xl" ta="center">
        Check out our other categories
      </Text>
      <ScrollArea type="always">
        <Group p={2} position="center" noWrap>
          {categories?.map((cat) => (
            <CategoryItem key={`widget-category-${cat}`} />
          ))}
        </Group>
      </ScrollArea>
    </WidgetWrapper>
  );
}

function CategoryItem() {
  return <Box style={{ borderRadius: "md" }} w={150} h={135} bg="blue"></Box>;
}
