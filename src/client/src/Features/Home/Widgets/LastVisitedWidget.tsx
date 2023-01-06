import { Flex, Stack, Button, Text, Divider, Image, Box } from "@mantine/core";
import { useProductGetProductsById } from "../../../API/shopComponents";
import { ProductDetail } from "../../../API/shopSchemas";
import { WidgetWrapper } from "./WidgetWrapper";

interface LastVisitedWidgetProps {
  productIds: string[];
}

export const LastVisitedWidget = ({ productIds }: LastVisitedWidgetProps) => {
  const { data, error, isLoading } = useProductGetProductsById({
    queryParams: { productIds: productIds },
  });
  return (
    <WidgetWrapper>
      <Stack h={180}>
        <Text>Last visited</Text>
        {data?.map((product) => (
          <LastVisitedItem product={product} />
        ))}
      </Stack>
    </WidgetWrapper>
  );
};

interface LastVisitedItemProps {
  product: ProductDetail;
}
const LastVisitedItem = ({ product }: LastVisitedItemProps) => {
  return (
    <Flex justify="flex-start" align="flex-start" direction="row" gap="md">
      <Box style={{ width: 60 }}>
        <Image radius="md" src={product.imageUrl} alt={product.name} />
      </Box>
      <Text>
        {product.name} - ${product.price}
      </Text>
    </Flex>
  );
};
