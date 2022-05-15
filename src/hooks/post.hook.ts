import useSWR from "swr";
import { fetcher } from "../utils";

export default function usePost(slug) {
  const { data, error } = useSWR(
    `http://localhost:3000/posts/slug/${slug}`,
    fetcher
  );

  return {
    post: data,
    isLoading: !error && !data,
    isError: error,
  };
}
