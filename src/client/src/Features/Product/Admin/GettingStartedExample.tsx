import sortBy from "lodash/sortBy";

import { Paper, Select, Text } from "@mantine/core";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import {
  useCategoryGetCategoriesQuery,
  useCategoryGetItemsForCategoryQuery,
} from "../API/categoryAPI";
import { showNotification } from "@mantine/notifications";
import { useProductDeleteProductByIdQuery } from "../API/productAPI";

export default function GettingStartedExample() {
  const [value, setValue] = useState<string | null>(null);

  const { data: categories } = useCategoryGetCategoriesQuery();
  const { data: products } = useCategoryGetItemsForCategoryQuery({
    category: "music",
  });

  const deleteProduct = (id: string) => {};

  //const delete = useProductDeleteProductByIdQuery();

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
        records={records}
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
              <Text weight={700} color={quantity === 0 ? "blue" : "red"}>
                {quantity}
              </Text>
            ),
          },
          { accessor: "category" },
          { accessor: "price", title: "Price (USD)", sortable: true },
        ]}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        onRowClick={({ id, name }) => alert(`You clicked on ${name} ${id}`)}
        rowContextMenu={{
          items: (record) => [
            {
              key: "edit",
              onClick: () => deleteProduct(record.id),
            },
            {
              key: "delete",
              color: "red",
              title: `Delete company ${record.name}`,
              onClick: () =>
                showNotification({
                  color: "red",
                  message: `Should delete company ${record.name}`,
                }),
            },
            {
              key: "sendMessage",
              title: "Send message to company HQ",
              onClick: () => {
                showNotification({
                  message: "Should send a message to this company",
                });
              },
            },
          ],
        }}
      />
    </Paper>
  );
}
