import { ColorModeScript } from "@chakra-ui/react";
import { theme } from "../utils/theme";

const LoadableColorModeScript: React.FC = () => (
  <ColorModeScript initialColorMode={theme.config.initialColorMode} />
);
export default LoadableColorModeScript;
