import { useParams } from "react-router-dom";
import { SimpleGrid, Heading, Divider } from "@chakra-ui/react";
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
      <Heading>{categoryId.toUpperCase()}</Heading>
      <Divider my="xs" />
      <SimpleGrid columns={4}>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </PageContainer>
  );
}
