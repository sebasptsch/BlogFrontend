import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { positions, Provider as AlertProvider } from "react-alert";
import ReactDOM from "react-dom/client";
import { SWRConfig } from "swr";
import { ChakraAlert } from "./components/Alert";
import AppRouter from "./router";
import { fetcher } from "./utils";
import theme from "./utils/theme";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AlertProvider
        template={ChakraAlert}
        position={positions.BOTTOM_RIGHT}
        timeout={2000}
      >
        <SWRConfig value={{ fetcher: fetcher }}>
          <AppRouter />
        </SWRConfig>
      </AlertProvider>
    </ChakraProvider>
  </React.StrictMode>
);
