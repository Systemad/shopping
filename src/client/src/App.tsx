import { MantineProvider, Text } from "@mantine/core";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Text>Hello</Text>
    </MantineProvider>
  );
}

export default App;
