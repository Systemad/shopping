import { Text, Paper, Box, Group, ScrollArea } from "@mantine/core";
import SectionWrapper from "./SectionWrapper";

export function Categories() {
  return (
    <SectionWrapper>
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
    </SectionWrapper>
  );
}

function CategoryItem() {
  return <Box style={{ borderRadius: "md" }} w={150} h={135} bg="blue"></Box>;
}
