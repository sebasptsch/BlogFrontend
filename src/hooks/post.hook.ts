import useSWR from "swr";
import { GetPostWithUserDto } from "../generated";

export function usePostSlug(slug) {
  const { data, error } = useSWR<GetPostWithUserDto>(`/posts/slug/${slug}`);

  return {
    post: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function usePostId(id: number) {
  const { data, error } = useSWR<GetPostWithUserDto>(`/posts/${id}`);

  return {
    post: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default usePostSlug;
