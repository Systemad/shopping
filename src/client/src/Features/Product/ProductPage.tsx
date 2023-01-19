import {
  SimpleGrid,
  Grid,
  GridItem,
  Image,
  Stack,
  HStack,
  Text,
  Box,
  Button,
  IconButton,
  Input,
  useNumberInput,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "../Components/PageContainer";
import { useCart } from "../ShoppingCart/Hooks/useCart";

import { ProductDetail, useProductGetProductQuery } from "./API/productAPI";
import { ProductParams } from "./params";

export function ProductPage() {
  const { productId } = useParams<keyof ProductParams>() as ProductParams;

  const { data: product } = useProductGetProductQuery({
    productId: productId,
  });

  return (
    <PageContainer>
      <Grid justifyContent={"center"} alignContent="flex-start">
        <GridItem>
          <Stack align="end-start" bg="green">
            <Image
              fit="contain"
              w={5}
              h={5}
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1936&q=80"
            />
          </Stack>
        </GridItem>
        <GridItem>
          <Image src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1936&q=80" />
        </GridItem>
        <GridItem>
          <ProductInformation product={product} />
        </GridItem>
      </Grid>
    </PageContainer>
  );
}

interface ProductInformationProps {
  product?: ProductDetail;
}
function ProductInformation({ product }: ProductInformationProps) {
  const [value, setValue] = useState(0);

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 0.01,
      defaultValue: 1.53,
      min: 1,
      max: 6,
      precision: 2,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const { addProductToCart } = useCart();

  return (
    <Box w={400}>
      <Stack color="red" p="md">
        <Text>{product?.name}</Text>

        <HStack>
          <Text>Price: ${product?.price}</Text>
        </HStack>

        <Text>Description</Text>
        <Text>{product?.description}</Text>

        <HStack spacing={5}>
          <HStack maxW="320px">
            <Button {...inc}>+</Button>
            <Input {...input} />
            <Button {...dec}>-</Button>
          </HStack>
          <Button onClick={() => addProductToCart(product!, value)}>
            Add to cart
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
}
