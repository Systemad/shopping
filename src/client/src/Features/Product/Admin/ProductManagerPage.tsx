import { Table, Select } from "@mantine/core";
import { useState } from "react";
import {
  useCategoryGetCategoriesQuery,
  useCategoryGetItemsForCategoryQuery,
} from "../API/categoryAPI";
import { useProductGetProductQuery } from "../API/productAPI";

export function ProductManagerPage() {
  const [value, setValue] = useState<string | null>(null);

  const { data: categories } = useCategoryGetCategoriesQuery();
  const { data } = useCategoryGetItemsForCategoryQuery({ category: "music" });

  //const categories: string[] = data?.forEach(x => x.name)
  const ths = (
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Price</th>
      <th>Category</th>
    </tr>
  );

  const rows = data?.map((element) => (
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>{element.price}</td>
      <td>{element.category}</td>
    </tr>
  ));

  return (
    <Table captionSide="bottom">
      <Select value={value} onChange={setValue} data={categories!} />
      <caption>Some elements from periodic table</caption>
      <thead>{ths}</thead>
      <tbody>{rows}</tbody>
      <tfoot>{ths}</tfoot>
    </Table>
  );
}
