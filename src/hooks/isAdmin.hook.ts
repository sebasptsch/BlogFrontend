import useSWR from "swr";
import { fetcher } from "@utils";
import { IsAdminDto } from "../generated";

export function useIsAdmin() {
  const { data, error } = useSWR<IsAdminDto>(`/auth/isAdmin`, fetcher);
  return {
    isAdmin: data?.isAdmin,
    isLoading: !error && !data,
    isError: error,
  };
}
