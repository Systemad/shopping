import { MantineProvider, Text, AppShell, Navbar, Header } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Features/Home";
import MainHeader, { HeaderLink } from "./Features/Components/MainHeader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/test",
    element: <Text>whatevs</Text>,
  },
]);

const Links: HeaderLink[] = [
  { link: "/home", label: "Home" },
  { link: "/test", label: "Test" },
];

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        padding="md"
        header={
          <Header height={80} mb={120} p="md">
            <MainHeader links={Links} />
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <RouterProvider router={router} />
      </AppShell>
    </MantineProvider>
  );
}

export default App;
