import useSWR from "swr";
import { fetcher } from "@utils";

export function useLoggedIn() {
  const { data, error } = useSWR(`/auth/loggedIn`, fetcher);

  return {
    loggedIn: data?.loggedIn,
    isLoading: !error && !data,
    isError: error,
  };
}
