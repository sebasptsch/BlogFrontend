import useSWR from "swr";
import { fetcher } from "@utils";
import { LoggedInDto } from "../generated";

export function useLoggedIn() {
  const { data, error } = useSWR<LoggedInDto>(`/auth/loggedIn`, fetcher);

  return {
    loggedIn: data?.loggedIn,
    isLoading: !error && !data,
    isError: error,
  };
}
