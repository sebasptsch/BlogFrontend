import useSWR from "swr";
import { fetcher } from "@utils";
import { ImageDto } from "../generated";

export function useImage(id: number) {
  const { data, error } = useSWR<ImageDto, any>(`/images/${id}`);
  return {
    image: data,
    isLoading: !error && !data,
    isError: error,
  };
}
