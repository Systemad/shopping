import {
  Flex,
  Stack,
  Image,
  Text,
  Group,
  Paper,
  Divider,
  Box,
  Tabs,
  SimpleGrid,
} from "@mantine/core";

import { WidgetWrapper } from "./WidgetWrapper";

export function FeaturedWidget() {
  return (
    <>
      <WidgetWrapper>
        <Text fz="xl" ta="center">
          Our Featured Products
        </Text>
        <Tabs keepMounted={false} defaultValue="ALL">
          <Tabs.List grow position="center">
            <Tabs.Tab value="ALL">ALL</Tabs.Tab>
            <Tabs.Tab value="new-arrivials">NEW ARRIVALS</Tabs.Tab>
            <Tabs.Tab value="best-sellers">BEST SELLERS</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="ALL" pt="xs">
            <FeaturedCategory name="all" />
          </Tabs.Panel>

          <Tabs.Panel value="new-arrivials" pt="xs">
            <FeaturedCategory name="new-arrivals" />
          </Tabs.Panel>

          <Tabs.Panel value="best-sellers" pt="xs">
            <FeaturedCategory name="best-sellers" />
          </Tabs.Panel>
        </Tabs>
      </WidgetWrapper>
    </>
  );
}

interface FeaturedCategoryProps {
  name: string;
}

function FeaturedCategory({ name }: FeaturedCategoryProps) {
  return (
    <SimpleGrid cols={4}>
      <FeaturedProductItem />
      <FeaturedProductItem />
      <FeaturedProductItem />
      <FeaturedProductItem />
    </SimpleGrid>
  );
}

function FeaturedProductItem() {
  return (
    <Flex>
      <Box style={{ width: 250 }}>
        <Text ta="center" fz="lg">
          Candy
        </Text>
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
      </Box>
    </Flex>
  );
}
