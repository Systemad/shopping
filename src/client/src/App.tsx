import {
  MantineProvider,
  AppShell,
  Header,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MainHeader, { HeaderLink } from "./Features/Components/MainHeader";
import Home from "./Features/Home";
import { useState } from "react";
import { CategoriesPage } from "./Features/Product/CategoriesPage";
import { CategoryPage } from "./Features/Product/CategoryPage";
import { ProductPage } from "./Features/Product/ProductPage";

const queryClient = new QueryClient();

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
        /* // FIX NESTED
        children: [
          {
            path: ":categoryId",
            element: <CategoryPage />,
          },
        ],
        */
      },
      {
        path: "categories/:categoryId",
        element: <CategoryPage />,
      },
      {
        path: "product",
        element: <ProductPage />,
      },
    ],
  },
]);

const baseCategory = "categories";

const Links: HeaderLink[] = [
  { link: "/", label: "Home" },
  { link: `${baseCategory}/hardware`, label: "Hardware" },
  { link: `${baseCategory}/software`, label: "Software" },
  { link: `${baseCategory}/accessories`, label: "Accessories" },
  { link: `${baseCategory}/books`, label: "Books" },
  { link: "categories", label: "All Categories" },
];

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

//<ReactQueryDevtools initialIsOpen={true} />;

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
