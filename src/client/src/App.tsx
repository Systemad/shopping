import {
  MantineProvider,
  AppShell,
  Header,
  ColorSchemeProvider,
  ColorScheme,
  Global,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { NotificationsProvider } from "@mantine/notifications";
import MainHeader, { HeaderLink } from "./Features/Components/MainHeader";
import Home from "./Features/Home";
import { useState } from "react";
import { CategoriesPage } from "./Features/Product/CategoriesPage";
import { CategoryPage } from "./Features/Product/CategoryPage";
import { ProductPage } from "./Features/Product/ProductPage";
import { ShoppingCardOverlay } from "./Features/ShoppingCart/Components/ShoppingCartOverlay";
import { store } from "./redux/store";
import { CheckoutPage } from "./Features/Checkout/CheckoutPage";
import { ProductManagerPage } from "./Features/Product/Admin/ProductManagerPage";

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
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "admin/test",
        element: <ProductManagerPage />,
      },
    ],
  },
]);

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <Provider store={store}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >
          <ModalsProvider>
            <NotificationsProvider limit={5} autoClose={5000}>
              <RouterProvider router={router} />
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </Provider>
  );
}

function AppShellWrapper() {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      padding="md"
      header={
        <MainHeader toggleShoppingCartDrawer={() => setOpened(!opened)} />
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
      <ShoppingCardOverlay
        isOpen={opened}
        toggleOpen={() => setOpened(!opened)}
      />
    </AppShell>
  );
}
export default App;
