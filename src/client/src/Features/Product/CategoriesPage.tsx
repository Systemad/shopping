import { Container, SimpleGrid } from "@mantine/core";
import { PageContainer } from "../Components/PageContainer";
import { CategoryCard } from "./Components/CategoryCard";

export function CategoriesPage() {
  return (
    <PageContainer>
      <SimpleGrid cols={3}>
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </SimpleGrid>
    </PageContainer>
  );
}
