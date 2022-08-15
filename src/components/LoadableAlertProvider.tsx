import { positions, Provider } from "react-alert";
import { ChakraAlert } from ".";

interface AlertProviderProps {
  children: React.ReactNode;
}

const LoadableAlertProvider: React.FC<AlertProviderProps> = ({ children }) => (
  <Provider
    template={ChakraAlert}
    position={positions.BOTTOM_RIGHT}
    timeout={2000}
  >
    {children}
  </Provider>
);
export default LoadableAlertProvider;
