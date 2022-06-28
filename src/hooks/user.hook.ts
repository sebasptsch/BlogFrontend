import useSWR from "swr";
import { fetcher } from "@utils";
import { UserDto } from "../generated";

export function useUser(id) {
  const { data, error } = useSWR<UserDto>(`/users/${id}`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
