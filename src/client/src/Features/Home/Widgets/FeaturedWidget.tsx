import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  SimpleGrid,
  Flex,
  Box,
  Image,
} from "@chakra-ui/react";

import { WidgetWrapper } from "./WidgetWrapper";

export function FeaturedWidget() {
  return (
    <>
      <WidgetWrapper>
        <Text size="xl" align="center">
          Our Featured Products
        </Text>
        <Tabs isFitted isLazy defaultIndex={0}>
          <TabList>
            <Tab>ALL</Tab>
            <Tab>NEW ARRIVALS</Tab>
            <Tab>BEST SELLERS</Tab>
          </TabList>

          <TabPanels>
            <TabPanel pt="xs">
              <FeaturedCategory name="all" />
            </TabPanel>

            <TabPanel pt="xs">
              <FeaturedCategory name="new-arrivals" />
            </TabPanel>

            <TabPanel pt="xs">
              <FeaturedCategory name="best-sellers" />
            </TabPanel>
          </TabPanels>
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
    <SimpleGrid columns={4}>
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
        <Text size="lg">Candy</Text>
        <Image
          borderRadius="md"
          src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          alt="Random unsplash image"
        />
        <Text size="md">$10.99</Text>
        <Text>$8.99</Text>
      </Box>
    </Flex>
  );
}
