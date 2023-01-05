import { SimpleGrid, Title, Divider } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useCategoryGetItemsForCategory } from "../../API/shopComponents";
import { CategoryParam } from "../../params";
import { PageContainer } from "../Components/PageContainer";
import { ProductCard } from "./Components/ProductCard";

export function CategoryPage() {
  const { categoryId } = useParams<keyof CategoryParam>() as CategoryParam;

  const { data, error, isLoading } = useCategoryGetItemsForCategory(
    { pathParams: { category: categoryId }, queryParams: {} },
    {}
  );

  return (
    <PageContainer>
      <Title ta="center" order={1}>
        {categoryId.toUpperCase()}
      </Title>
      <Divider my="xs" />
      <SimpleGrid cols={4}>
        {data?.map((item) => (
          <ProductCard />
        ))}
      </SimpleGrid>
    </PageContainer>
  );
}
