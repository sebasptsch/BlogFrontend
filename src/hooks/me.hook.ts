import useSWR from "swr";

export function useMe() {
  const { data, error } = useSWR(`/users/me`);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
