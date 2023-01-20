import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./Features/Home";
import { useState } from "react";
import { CategoriesPage } from "./Features/Product/CategoriesPage";
import { CategoryPage } from "./Features/Product/CategoryPage";
import { ProductPage } from "./Features/Product/ProductPage";
import { store } from "./redux/store";
import { CheckoutPage } from "./Features/Checkout/CheckoutPage";
import { ProductManagerPage } from "./Features/Product/Admin/ProductManagerPage";
import { AppLayout } from "./Features/Components/AppLayout";

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
      /*
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      */
      /*
      {
        path: "admin/test",
        element: <ProductManagerPage />,
      },
      */
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

function AppShellWrapper() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
export default App;
