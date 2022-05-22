import useSWR from "swr";
import { fetcher } from "@utils";

export function useImage(id: number) {
  const { data, error } = useSWR(`/images/${id}`);

  return {
    image: data,
    isLoading: !error && !data,
    isError: error,
  };
}
