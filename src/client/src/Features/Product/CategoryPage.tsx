import { SimpleGrid, Title, Divider } from "@mantine/core";
import { useParams } from "react-router-dom";

import { PageContainer } from "../Components/PageContainer";
import { useCategoryGetItemsForCategoryQuery } from "./API/categoryAPI";

import { ProductCard } from "./Components/ProductCard";
import { CategoryParam } from "./params";

export function CategoryPage() {
  const { categoryId } = useParams<keyof CategoryParam>() as CategoryParam;

  const {
    data: products,
    error,
    isLoading,
  } = useCategoryGetItemsForCategoryQuery({
    category: categoryId,
  });

  return (
    <PageContainer>
      <Title ta="center" order={1}>
        {categoryId.toUpperCase()}
      </Title>
      <Divider my="xs" />
      <SimpleGrid cols={4}>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </PageContainer>
  );
}
