import sortBy from "lodash/sortBy";

import {
  ActionIcon,
  Group,
  Paper,
  Select,
  Text,
  Button,
  TextInput,
} from "@mantine/core";
import { openConfirmModal, openModal } from "@mantine/modals";
import { useForm } from "@mantine/form";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import {
  useCategoryGetCategoriesQuery,
  useCategoryGetItemsForCategoryQuery,
} from "../API/categoryAPI";

import {
  ProductDetail,
  useProductDeleteProductByIdMutation,
  useProductUpdateProductMutation,
} from "../API/productAPI";

import { IconEdit, IconTrash, IconEye } from "@tabler/icons";

export default function GettingStartedExample() {
  const [value, setValue] = useState<string | null>(null);

  const { data: categories } = useCategoryGetCategoriesQuery();
  const { data: products } = useCategoryGetItemsForCategoryQuery({
    category: "music",
  });

  const [deleteProduct] = useProductDeleteProductByIdMutation();
  const [updateProduct] = useProductUpdateProductMutation();

  const openDeleteModal = (product: ProductDetail) =>
    openConfirmModal({
      title: "Please confirm your action",
      children: <Text size="lg">Do you wish to delete this product?</Text>,
      labels: { confirm: "Confirm deletion", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => deleteProduct({ productId: product.id }),
    });

  /*
      id: string;
  name: string;
  description: string;
  category: ProductCategory;
  quantity: number;
  price: number;
  imageUrl: string;
  createdAt: string;
    */
  const form = useForm({
    initialValues: {
      product: {
        id: "",
        name: "",
        description: "",
        category: "",
        quantity: 0,
        price: 0,
        imageUrl: "",
        createdAt: "",
      },
    },
    validate: {
      product: {
        name: (value) =>
          value.length < 2 ? "First name must have at least 2 letters" : null,
        description: (value) =>
          value.length < 2 ? "First name must have at least 2 letters" : null,
      },
    },
  });

  const openEditModal = (product: ProductDetail) => {
    form.setValues({
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        quantity: product.quantity,
        price: product.price,
        imageUrl: product.imageUrl,
        createdAt: product.createdAt,
      },
    });
    openModal({
      title: "Update product",
      children: (
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            label="ID"
            placeholder="Product ID"
            data-autofocus
            {...form.getInputProps("product.id")}
            disabled
          />
          <TextInput
            label="Name"
            placeholder="Product Name"
            data-autofocus
            {...form.getInputProps("product.name")}
          />
          <TextInput
            label="Description"
            placeholder="Product description"
            data-autofocus
            {...form.getInputProps("product.description")}
          />
          <Button fullWidth onClick={() => updateProduct(product)} mt="md">
            Submit
          </Button>
        </form>
      ),
    });
  };

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "name",
    direction: "asc",
  });

  const [records, setRecords] = useState(sortBy(products, "name"));
  useEffect(() => {
    const data = sortBy(products, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [products, sortStatus]);

  return (
    <Paper>
      {categories && (
        <Select value={value} onChange={setValue} data={categories} />
      )}

      <DataTable
        withBorder
        borderRadius="lg"
        withColumnBorders
        striped
        highlightOnHover
        columns={[
          {
            accessor: "id",
            title: "ID",
            textAlignment: "right",
          },
          { accessor: "name", sortable: true },
          {
            accessor: "quantity",
            sortable: true,
            render: ({ quantity }) => (
              <Text weight={700} color={quantity > 0 ? "blue" : "red"}>
                {quantity}
              </Text>
            ),
          },
          { accessor: "category" },
          { accessor: "price", title: "Price (USD)", sortable: true },
          {
            accessor: "actions",
            title: <Text mr="xs">Row actions</Text>,
            textAlignment: "right",
            render: (product) => (
              <Group spacing={4} position="right" noWrap>
                <ActionIcon
                  color="green"
                  onClick={() => openDeleteModal(product)}
                >
                  <IconEye size={16} />
                </ActionIcon>
                <ActionIcon
                  color="blue"
                  onClick={() => openDeleteModal(product)}
                >
                  <IconEdit size={16} />
                </ActionIcon>
                <ActionIcon
                  color="red"
                  onClick={() => openDeleteModal(product)}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        onRowClick={({ id, name }) => alert(`You clicked on ${name} ${id}`)}
        onSortStatusChange={setSortStatus}
        sortStatus={sortStatus}
        records={records}
      />
    </Paper>
  );
}
