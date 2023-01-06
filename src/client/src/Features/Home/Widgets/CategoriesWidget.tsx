import { Text, Paper, Box, Group, ScrollArea } from "@mantine/core";
import { WidgetWrapper } from "./WidgetWrapper";

export function CategoriesWidget() {
  return (
    <WidgetWrapper>
      <ScrollArea type="always">
        <Group p={2} position="center" noWrap>
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
        </Group>
      </ScrollArea>
    </WidgetWrapper>
  );
}

function CategoryItem() {
  return <Box style={{ borderRadius: "md" }} w={150} h={135} bg="blue"></Box>;
}
