import loadable from "@loadable/component";
import React from "react";
import ReactDOM from "react-dom/client";
import { Helmet } from "react-helmet";
import {
  ChakraProvider,
  LoadableAlertProvider,
  LoadableColorModeScript,
  LoadableSWRConfig,
  SWToast,
} from "./components";
import { helmetOptions } from "./utils/helmetOptions";

const AppRouter = loadable(() => import("./router"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Helmet {...helmetOptions} />
    <LoadableColorModeScript />

    <ChakraProvider>
      <SWToast />
      <LoadableAlertProvider>
        <LoadableSWRConfig>
          <AppRouter />
        </LoadableSWRConfig>
      </LoadableAlertProvider>
    </ChakraProvider>
  </React.StrictMode>
);
