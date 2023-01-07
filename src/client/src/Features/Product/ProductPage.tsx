import {
  Group,
  SimpleGrid,
  Stack,
  Paper,
  Image,
  Box,
  Text,
  Title,
  Rating,
  NumberInput,
  ActionIcon,
  Button,
  Grid,
  NumberInputHandlers,
} from "@mantine/core";
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "../Components/PageContainer";
import { ProductParams } from "./params";

interface ProductPageComponent {
  product: string;
}

export function ProductPage() {
  const { productId } = useParams<keyof ProductParams>() as ProductParams;

  //const { data, error, isLoading } = useCategoryGetItemsForCategory(
  //  { pathParams: { category: categoryId }, queryParams: {} },
  //  {}
  //);

  return (
    <PageContainer>
      <Grid justify="center" align="flex-start">
        <Grid.Col span="auto" style={{ minHeight: 80 }}>
          <Stack align="end-start" bg="green">
            <Image
              fit="contain"
              w={5}
              h={5}
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1936&q=80"
            />
          </Stack>
        </Grid.Col>
        <Grid.Col span={5} style={{ minHeight: 400 }}>
          <Image src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1936&q=80" />
        </Grid.Col>
        <Grid.Col span="auto">
          <ProductInformation />
        </Grid.Col>
      </Grid>
    </PageContainer>
  );
}

function ProductInformation() {
  const [value, setValue] = useState(0);
  const handlers = useRef<NumberInputHandlers>();
  return (
    <Paper w={400}>
      <Stack color="red" p="md">
        <Title order={1} ta="center">
          {" "}
          PRODUCT
        </Title>

        <Group position="apart">
          <Title order={4}>Price: 999</Title>
          <Rating value={3.5} fractions={2} readOnly />
        </Group>

        <Title order={2} fz="xl">
          Description
        </Title>
        <Text>Description text</Text>

        <Group position="center" spacing={5}>
          <ActionIcon
            size={36}
            variant="default"
            onClick={() => handlers?.current?.decrement()}
          >
            –
          </ActionIcon>

          <NumberInput
            hideControls
            value={value}
            onChange={(val) => setValue(val!)}
            handlersRef={handlers}
            max={5}
            min={1}
            step={1}
            styles={{ input: { width: 44, textAlign: "center" } }}
          />

          <ActionIcon
            size={36}
            variant="default"
            onClick={() => handlers?.current?.increment()}
          >
            +
          </ActionIcon>
          <Button>Add to cart</Button>
        </Group>
      </Stack>
    </Paper>
  );
}
