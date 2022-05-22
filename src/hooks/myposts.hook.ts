import useSWR from "swr";
import { fetcher } from "@utils";

export function useMyPosts() {
  const { data, error } = useSWR(`/posts/me`, fetcher);

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
  };
}
