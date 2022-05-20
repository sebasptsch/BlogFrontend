import useSWR from "swr";
import { fetcher } from "../utils";

export default function useImage(id: number) {
  const { data, error } = useSWR(`/images/${id}`, fetcher);

  return {
    image: data,
    isLoading: !error && !data,
    isError: error,
  };
}
