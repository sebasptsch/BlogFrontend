import useSWR from "swr";
import { fetcher } from "../utils";

export default function useImages() {
  const { data, error } = useSWR(`http://localhost:3000/images`, fetcher);

  return {
    images: data,
    isLoading: !error && !data,
    isError: error,
  };
}
