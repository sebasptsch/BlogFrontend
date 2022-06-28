import useSWR from "swr";
import { UserDto } from "../generated";

export function useMe() {
  const { data, error } = useSWR<UserDto>(`/users/me`);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
