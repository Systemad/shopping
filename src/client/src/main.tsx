import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import maintheme from "./Features/Theme/theme";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={maintheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
