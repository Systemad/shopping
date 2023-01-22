import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import maintheme from "./Features/Theme/theme";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={maintheme}>
      <ColorModeScript initialColorMode={maintheme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
