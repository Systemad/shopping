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
  productSpliApi,
  useCategoryGetCategoriesQuery,
  useCategoryGetItemsForCategoryQuery,
} from "../API/categoryAPI";

import {
  ProductDetail,
  useProductDeleteProductByIdMutation,
  useProductUpdateProductMutation,
} from "../API/productAPI";

import { IconEdit, IconTrash, IconEye } from "@tabler/icons";
import { useAppDispatch } from "../../../redux/hooks";

export function ProductManagerPage() {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState<string | null>(null);

  const { data: categories } = useCategoryGetCategoriesQuery();
  const { data: products, refetch } = useCategoryGetItemsForCategoryQuery(
    {
      category: category ?? "music",
    },
    { refetchOnMountOrArgChange: true }
  );

  const [deleteProduct] = useProductDeleteProductByIdMutation();
  const [updateProduct] = useProductUpdateProductMutation();

  const openDeleteModal = (product: ProductDetail) =>
    openConfirmModal({
      title: "Please confirm your action",
      children: <Text size="lg">Do you wish to delete this product?</Text>,
      labels: { confirm: "Confirm deletion", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        deleteProduct({ productId: product.id });
        dispatch(productSpliApi.util.invalidateTags(["Category"]));
      },
    });

  const form = useForm<ProductDetail>({
    initialValues: undefined,
    validate: {
      name: (value) =>
        value.length < 2 ? "Product name must have at least 2 letters" : null,
      description: (value) =>
        value.length < 2
          ? "Description name must have at least 2 letters"
          : null,
    },
  });

  type FormValues = typeof form.values;
  const handleSubmit = (values: FormValues) => updateProduct(values);

  const openEditModal = (product: ProductDetail) => {
    // TODO: this doesn't override initial value
    form.setValues(product);
    form.resetDirty();

    openModal({
      title: "Update product",
      children: (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="ID"
            //placeholder=
            //data-autofocus
            {...form.getInputProps("id")}
            disabled
          />
          <TextInput
            label="Name"
            data-autofocus
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Description"
            data-autofocus
            {...form.getInputProps("description")}
          />
          <TextInput
            label="Category"
            data-autofocus
            {...form.getInputProps("category")}
          />
          <TextInput
            label="Quantity"
            data-autofocus
            {...form.getInputProps("quantity")}
          />
          <TextInput
            label="Price"
            data-autofocus
            {...form.getInputProps("price")}
          />
          <TextInput
            label="Image"
            data-autofocus
            {...form.getInputProps("imageUrl")}
          />
          <TextInput
            label="Category"
            data-autofocus
            {...form.getInputProps("createdAt")}
            disabled
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
        <Select value={category} onChange={setCategory} data={categories} />
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
                <ActionIcon color="blue" onClick={() => openEditModal(product)}>
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
        onSortStatusChange={setSortStatus}
        sortStatus={sortStatus}
        records={records}
      />
    </Paper>
  );
}
