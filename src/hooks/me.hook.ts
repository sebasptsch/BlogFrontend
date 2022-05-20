import useSWR from "swr";
import { fetcher } from "../utils";

export default function useMe() {
  const { data, error } = useSWR(`/users/me`);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
