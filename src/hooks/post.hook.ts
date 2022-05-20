import useSWR from "swr";
import { fetcher } from "../utils";

export function usePostSlug(slug) {
  const { data, error } = useSWR(`/posts/slug/${slug}`, fetcher);

  return {
    post: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function usePostId(id: number) {
  const { data, error } = useSWR(`/posts/${id}`, fetcher);

  return {
    post: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default usePostSlug;
