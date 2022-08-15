import { SWRConfig } from "swr";
import { fetcher } from "../utils/fetcher";

interface SWRConfigProps {
  children: React.ReactNode;
}

const LoadableSWRConfig: React.FC<SWRConfigProps> = ({ children }) => (
  <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
);

export default LoadableSWRConfig;
