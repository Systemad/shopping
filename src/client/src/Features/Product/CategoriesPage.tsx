import { SimpleGrid, Container } from "@chakra-ui/react";

import { useCategoryGetCategoriesQuery } from "./API/categoryAPI";

import { CategoryCard } from "./Components/CategoryCard";

export function CategoriesPage() {
  const { data: categories } = useCategoryGetCategoriesQuery();

  return (
    <Container maxW={"5xl"} flex={"1 0 auto"} py={8} mt={20}>
      <SimpleGrid columns={3} spacing={4}>
        {categories?.map((cat) => (
          <CategoryCard key={`category-${cat}`} name={cat} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
