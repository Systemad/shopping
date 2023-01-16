import { Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";

export default function GettingStartedExample() {
  return (
    <DataTable
      withBorder
      borderRadius="lg"
      withColumnBorders
      striped
      highlightOnHover
      // provide data
      records={[
        { id: 1, name: "Joe Biden", bornIn: 1942, party: "Democratic" },
        // more records...
      ]}
      // define columns
      columns={[
        {
          accessor: "id",
          // this column has a custom title
          title: "#",
          // right-align column
          textAlignment: "right",
        },
        { accessor: "name" },
        {
          accessor: "party",
          // this column has custom cell data rendering
          render: ({ party }) => (
            <Text weight={700} color={party === "Democratic" ? "blue" : "red"}>
              {party.slice(0, 3).toUpperCase()}
            </Text>
          ),
        },
        { accessor: "bornIn" },
      ]}
      // execute this callback when a row is clicked
      onRowClick={({ name, party, bornIn }) =>
        alert(
          `You clicked on ${name}, a ${party.toLowerCase()} president born in ${bornIn}`
        )
      }
    />
  );
}
