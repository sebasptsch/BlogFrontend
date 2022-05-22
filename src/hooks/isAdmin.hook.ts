import useSWR from "swr";
import { fetcher } from "@utils";

export function useIsAdmin() {
  const { data, error } = useSWR(`/auth/isAdmin`, fetcher);

  return {
    isAdmin: data?.isAdmin,
    isLoading: !error && !data,
    isError: error,
  };
}
