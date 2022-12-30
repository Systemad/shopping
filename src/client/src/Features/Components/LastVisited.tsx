import { Flex, Stack, Button, Text, Divider, Image } from "@mantine/core";

const LastVisited = () => {
  return (
    <Stack
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
        height: 180,
      })}
    >
      <Text>Last visited</Text>
      <LastVisitedItem />
      <LastVisitedItem />
      <LastVisitedItem />
    </Stack>
  );
};

const LastVisitedItem = () => {
  return (
    <Flex justify="flex-start" align="flex-start" direction="row" gap="md">
      <div style={{ width: 60 }}>
        <Image
          radius="md"
          src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          alt="Random unsplash image"
        />
      </div>
      <Text>Candy - $8.99</Text>
    </Flex>
  );
};
export default LastVisited;
