import useSWR from "swr";
import { fetcher } from "@utils";

export function usePosts() {
  const { data, error } = useSWR(`/posts`, fetcher);

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
  };
}
