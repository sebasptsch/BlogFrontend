import useSWR from "swr";
import { fetcher } from "@utils";

export function useUser(id) {
  const { data, error } = useSWR(`/users/${id}`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
