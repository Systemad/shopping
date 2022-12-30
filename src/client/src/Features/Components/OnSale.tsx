import { Flex, Stack, Image, Text, Group } from "@mantine/core";

const OnSaleSection = () => {
  return (
    <Group>
      <OnSaleItem />
    </Group>
  );
};

const OnSaleItem = () => {
  return (
    <Stack>
      <div style={{ width: 60 }}>
        <Image
          radius="md"
          src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          alt="Random unsplash image"
        />
      </div>
      <Text>Price</Text>
    </Stack>
  );
};

export default OnSaleSection;
