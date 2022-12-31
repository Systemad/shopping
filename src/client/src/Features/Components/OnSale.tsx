import { Flex, Stack, Image, Text, Group, Paper, Divider } from "@mantine/core";
import SectionWrapper from "./SectionWrapper";

export function OnSaleSection() {
  return (
    <>
      <SectionWrapper>
        <Text fz="xl" ta="center">
          ON SALE!
        </Text>
        <Group position="apart" mt="xs" spacing={"lg"}>
          <OnSaleItem />
          <OnSaleItem />
          <OnSaleItem />
        </Group>
      </SectionWrapper>
    </>
  );
}

function OnSaleItem() {
  return (
    <Flex>
      <div style={{ width: 135 }}>
        <Image
          radius="md"
          src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          alt="Random unsplash image"
        />
        <Text td="line-through" fz="md" ta="center">
          $10.99
        </Text>
        <Text c="red" fz="lg" ta="center">
          $8.99
        </Text>
      </div>
    </Flex>
  );
}
