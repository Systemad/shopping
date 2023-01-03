import { SimpleGrid, Title, Divider } from "@mantine/core";
import { PageContainer } from "../Components/PageContainer";
import { ProductCard } from "./Components/ProductCard";

export function CategoryPage() {
  return (
    <PageContainer>
      <Title ta="center" order={1}>
        Clothes
      </Title>
      <Divider my="xs" />
      <SimpleGrid cols={4}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </SimpleGrid>
    </PageContainer>
  );
}
