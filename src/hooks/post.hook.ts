import useSWR from "swr";

export function usePostSlug(slug) {
  const { data, error } = useSWR(`/posts/slug/${slug}`);

  return {
    post: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function usePostId(id: number) {
  const { data, error } = useSWR(`/posts/${id}`);

  return {
    post: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default usePostSlug;
