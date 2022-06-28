import useSWR from "swr";
import { fetcher } from "@utils";
import { ImageDto } from "../generated";

export function useImages() {
  const { data, error } = useSWR<ImageDto[], any>(`/images`, fetcher);

  return {
    images: data,
    isLoading: !error && !data,
    isError: error,
  };
}
