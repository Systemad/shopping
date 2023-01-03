import {
  MantineProvider,
  AppShell,
  Header,
  ColorSchemeProvider,
  ColorScheme,
  Text,
} from "@mantine/core";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import MainHeader, { HeaderLink } from "./Features/Components/MainHeader";
import Home from "./Features/Home";
import { useState } from "react";
import { CategoriesPage } from "./Features/Product/CategoriesPage";
import { CategoryPage } from "./Features/Product/CategoryPage";

// TODO:
/*

  -- Fix categories page
  -- Add nice product overview of a product

  Add react query with openAPI (orval) https://orval.dev/guides/react-query
  Use loafer in react browswe to fetch data??

  */
const router = createBrowserRouter([
  {
    element: <AppShellWrapper />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
        children: [
          {
            path: ":categoryId",
            element: <CategoryPage />,
          },
        ],
      },
    ],
  },
]);

const Links: HeaderLink[] = [
  { link: "/", label: "Home" },
  { link: "categories", label: "Categories" },
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
        <RouterProvider router={router} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

function AppShellWrapper() {
  return (
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
              ? theme.colors.dark[5]
              : theme.colors.gray[0],
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
}
export default App;
