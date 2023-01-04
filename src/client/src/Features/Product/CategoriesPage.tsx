import { SimpleGrid } from "@mantine/core";
import { QueryClient } from "@tanstack/react-query";
import { useCategoryGetCategories } from "../../API/shopComponents";
import { PageContainer } from "../Components/PageContainer";
import { CategoryCard } from "./Components/CategoryCard";

/*
export const loader = (queryClient: QueryClient) => async () => {
  await queryClient.fetchQuery(
    ...useCategoryGetCategories({ queryParams: {} }),
    {}
  );
};
*/
export function CategoriesPage() {
  const { data, error, isLoading } = useCategoryGetCategories({
    queryParams: {},
  });

  return (
    <PageContainer>
      <SimpleGrid cols={3}>
        {data?.map((cat) => (
          <CategoryCard key={`category-${cat}`} name={cat} />
        ))}
      </SimpleGrid>
    </PageContainer>
  );
}
