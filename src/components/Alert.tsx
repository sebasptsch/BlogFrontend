import { Alert, AlertIcon } from "@chakra-ui/react";

const ChakraAlert = ({ style, options, message, close }) => (
  <Alert status={options.type} style={style} variant="left-accent">
    <AlertIcon />
    {message}
  </Alert>
);

export default ChakraAlert;
