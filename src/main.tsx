import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { fetcher, theme } from "@utils";
import React from "react";
import { positions, Provider as AlertProvider } from "react-alert";
import ReactDOM from "react-dom/client";
import { Helmet } from "react-helmet";
import { SWRConfig } from "swr";
import { ChakraAlert } from "./components";
import AppRouter from "./router";
import { helmetOptions } from "./utils/helmetOptions";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Helmet {...helmetOptions} />
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
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
