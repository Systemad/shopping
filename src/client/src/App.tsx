import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";

import Home from "./Features/Home";

/*
 ADD OrderGrain
 Add joirnealed grain, and raiseevents

 ADD more user functions, as wishlist (iWIshListGrain)and able to share them
 CHECK ADMIN prvielege, if not admin, simply dont render elements / pages
*/
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
        path: "category/:categoryId",
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

type AppProps = {
  pca: IPublicClientApplication;
};

function App({ pca }: AppProps) {
  return (
    <MsalProvider instance={pca}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </MsalProvider>
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
