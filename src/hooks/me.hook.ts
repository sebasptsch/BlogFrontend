import useSWR from "swr";
import { fetcher } from "../utils";

export default function useMe() {
  const { data, error } = useSWR(`http://localhost:3000/users/me`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
