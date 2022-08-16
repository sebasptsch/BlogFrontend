import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import React from "react";
import { positions, Provider } from "react-alert";
import ReactDOM from "react-dom/client";
import { Helmet } from "react-helmet";
import { SWRConfig } from "swr";
import { ChakraAlert, SWToast } from "./components";
import AppRouter from "./router";
import { fetcher } from "./utils/fetcher";
import { helmetOptions } from "./utils/helmetOptions";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Helmet {...helmetOptions} />
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />

    <ChakraProvider>
      <SWToast />
      <Provider
        template={ChakraAlert}
        position={positions.BOTTOM_RIGHT}
        timeout={2000}
      >
        <SWRConfig value={{ fetcher }}>
          <AppRouter />
        </SWRConfig>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
