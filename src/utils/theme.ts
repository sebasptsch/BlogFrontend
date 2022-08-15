import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import loadable from "@loadable/component";

const config: ThemeConfig = {
  useSystemColorMode: true,
  initialColorMode: "dark",
};

export const theme = extendTheme({
  config,
  colors: {
    discord: {
      50: "#e8eeff",
      100: "#c0ccf3",
      200: "#99aae5",
      300: "#7289da",
      400: "#4a67ce",
      500: "#314db5",
      600: "#253c8d",
      700: "#1a2b66",
      800: "#0d1a40",
      900: "#01091b",
    },
    github: {
      50: "#fbf0f2",
      100: "#dcd8d9",
      200: "#bfbfbf",
      300: "#a6a6a6",
      400: "#8c8c8c",
      500: "#737373",
      600: "#595959",
      700: "#404040",
      800: "#282626",
      900: "#150a0d",
    },
  },
});
