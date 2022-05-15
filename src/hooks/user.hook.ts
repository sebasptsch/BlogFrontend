import useSWR from "swr";
import { fetcher } from "../utils";

export default function useUser(id) {
  const { data, error } = useSWR(`http://localhost:3000/users/${id}`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
