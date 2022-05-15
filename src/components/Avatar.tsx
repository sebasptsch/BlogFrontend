import { Spinner } from "@chakra-ui/react";
import useUser from "../hooks/user.hook";

export default function Avatar({ id }) {
  const { user, isLoading, isError } = useUser(id);

  if (isLoading) return <Spinner />;
  if (isError) return "Error";
  return <img src={user.avatar} />;
}
