import useSWR from "swr";
import { fetcher } from "../utils";

export default function useImages() {
  const { data, error } = useSWR(`/images`, fetcher);

  return {
    images: data,
    isLoading: !error && !data,
    isError: error,
  };
}
