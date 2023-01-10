import { SimpleGrid } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { PageContainer } from "../Components/PageContainer";
import { useCategoryGetCategoriesQuery } from "./API/categoryAPI";

import { CategoryCard } from "./Components/CategoryCard";

export function CategoriesPage() {
  const {
    data: categories,
    error,
    isLoading,
  } = useCategoryGetCategoriesQuery();

  return (
    <PageContainer>
      <SimpleGrid cols={3}>
        {categories?.map((cat) => (
          <CategoryCard key={`category-${cat}`} name={cat} />
        ))}
      </SimpleGrid>
    </PageContainer>
  );
}
