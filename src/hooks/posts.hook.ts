import useSWR from "swr";
import { fetcher } from "@utils";
import { MinimalPostDto } from "../generated";

export function usePosts() {
  const { data, error } = useSWR<MinimalPostDto[]>(`/posts`, fetcher);

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
  };
}
