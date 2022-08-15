import { ChakraProvider as ChakraProv } from "@chakra-ui/react";
import { theme } from "../utils/theme";

interface ChakraProviderProps {
  children: React.ReactNode;
}

const ChakraProvider: React.FC<ChakraProviderProps> = ({ children }) => (
  <ChakraProv theme={theme}>{children}</ChakraProv>
);

export default ChakraProvider;
