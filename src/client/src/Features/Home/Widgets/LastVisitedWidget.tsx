import { Flex, Stack, Button, Text, Divider, Image, Box } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import {
  ProductDetail,
  useProductGetProductsByIdQuery,
} from "../../Product/API/productAPI";

import { WidgetWrapper } from "./WidgetWrapper";

export function LastVisitedWidget() {
  // Extract to own hook?
  const [lastVisitedIds, setLastVisitedids] = useLocalStorage<string[]>({
    key: "last-visisted",
  });
  const { data, error, isLoading } = useProductGetProductsByIdQuery({
    productIds: lastVisitedIds,
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
}

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
