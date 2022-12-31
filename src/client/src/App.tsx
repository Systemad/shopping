import {
  MantineProvider,
  AppShell,
  Navbar,
  Header,
  Affix,
  Button,
  Text,
  ColorSchemeProvider,
  ColorScheme,
  Transition,
} from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainHeader, { HeaderLink } from "./Features/Components/MainHeader";
import Home from "./Features/Home";
import { useState } from "react";

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
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
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
    </ColorSchemeProvider>
  );
}

export default App;
