import useSWR from "swr";
import { fetcher } from "@utils";
import { MinimalPostDto } from "../generated";

export function useMyPosts() {
  const { data, error } = useSWR<MinimalPostDto[]>(`/posts/me`, fetcher);

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
  };
}
