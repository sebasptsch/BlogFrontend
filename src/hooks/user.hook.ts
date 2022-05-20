import useSWR from "swr";
import { fetcher } from "../utils";

export default function useUser(id) {
  const { data, error } = useSWR(`/users/${id}`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
