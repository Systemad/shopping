import { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useDisclosure,
  Box,
  HStack,
  IconButton,
  Text,
  Select,
} from "@chakra-ui/react";

import { useForm } from "@mantine/form";

import {
  productSpliApi as categoryApi,
  useCategoryGetCategoriesQuery,
  useCategoryGetItemsForCategoryQuery,
} from "../API/categoryAPI";

import { ProductDetail, useProductDeleteProductByIdMutation, useProductUpdateProductMutation } from "../API/productAPI";

import { IconEdit, IconTrash, IconEye } from "@tabler/icons";
import { useAppDispatch } from "../../../redux/hooks";
import { DataTable } from "./Table";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<ProductDetail>();

export function ProductManagerPage() {
  const [currentProduct, setCurrentProduct] = useState<ProductDetail | undefined>(undefined);
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  const dispatch = useAppDispatch();
  const [category, setCategory] = useState<string>("music");

  const { data: categories } = useCategoryGetCategoriesQuery();
  const { data: products, refetch } = useCategoryGetItemsForCategoryQuery(
    {
      category: category ?? "music",
    },
    { refetchOnMountOrArgChange: true },
  );

  const [deleteProduct] = useProductDeleteProductByIdMutation();
  const [updateProduct] = useProductUpdateProductMutation();

  const form = useForm<ProductDetail>({
    initialValues: undefined,
    validate: {
      name: (value: string) => (value.length < 2 ? "Product name must have at least 2 letters" : null),
      description: (value: string) => (value.length < 2 ? "Description name must have at least 2 letters" : null),
    },
  });

  type FormValues = typeof form.values;
  const handleSubmit = (values: FormValues) => {
    updateProduct(values);
    onEditClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => setCategory(event.target.value);

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "ID",
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Name",
    }),
    columnHelper.accessor("description", {
      cell: (info) => info.getValue(),
      header: "Description",
    }),
    columnHelper.accessor("category", {
      cell: (info) => info.getValue(),
      header: "Category",
    }),
    columnHelper.accessor("quantity", {
      cell: (info) => info.getValue(),
      header: "Quantity",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("price", {
      cell: (info) => info.getValue(),
      header: "Price",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("imageUrl", {
      cell: (info) => info.getValue(),
      header: "Image",
    }),
    columnHelper.accessor("createdAt", {
      cell: (info) => info.getValue(),
      header: "Created Date",
    }),
    columnHelper.display({
      id: "actions",
      cell: (props) => (
        <IconButton
          aria-label="delete-product"
          icon={<IconTrash size={16} />}
          onClick={() => {
            deleteProduct({ productId: props.row.original.id });
            dispatch(categoryApi.util.invalidateTags(["Category"]));
          }}
        />
      ),
    }),
    columnHelper.display({
      id: "actions",
      cell: (props) => (
        <IconButton
          aria-label="delete-product"
          icon={<IconEdit size={16} />}
          onClick={() => {
            form.setValues(props.row.original);
            onEditOpen();
            dispatch(categoryApi.util.invalidateTags(["Category"]));
          }}
        />
      ),
    }),
  ];

  return (
    <Box mt="20" p="10">
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Text mb="8px">Product ID</Text>
              <Input
                id="ID"
                //placeholder=
                //data-autofocus
                {...form.getInputProps("id")}
                isReadOnly
              />

              <Text mb="8px">ID</Text>
              <Input id="Name" data-autofocus {...form.getInputProps("name")} />

              <Text mb="8px">Name</Text>
              <Input id="Description" data-autofocus {...form.getInputProps("description")} />

              <Text mb="8px">Category</Text>
              <Input id="Category" data-autofocus {...form.getInputProps("category")} />

              <Text mb="8px">Quantity</Text>
              <Input id="Quantity" data-autofocus {...form.getInputProps("quantity")} />

              <Text mb="8px">Price USD</Text>
              <Input id="Price" data-autofocus {...form.getInputProps("price")} />

              <Text mb="8px">Image</Text>
              <Input id="Image" data-autofocus {...form.getInputProps("imageUrl")} />

              <Text mb="8px">Created date</Text>
              <Input isReadOnly id="CreatedAt" data-autofocus {...form.getInputProps("createdAt")} disabled />
              <Button w="100%" mt="md" type="submit">
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Box>
        {categories && (
          <Select value={category} onChange={handleChange}>
            {categories.map((category) => (
              <option key={`category-${category}`}>{category}</option>
            ))}
          </Select>
        )}
        {products && <DataTable data={products} columns={columns} />}
      </Box>
    </Box>
  );
}
