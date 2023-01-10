import { Group, Paper } from "@mantine/core";
import { PageContainer } from "../../Components/PageContainer";

export function CheckoutPage() {
  return (
    <PageContainer>
      <Group position="center">
        <Paper>Products</Paper>
        <Paper>OrderSummary</Paper>
      </Group>
    </PageContainer>
  );
}
