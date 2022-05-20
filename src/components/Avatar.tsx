import { Avatar, Spinner } from "@chakra-ui/react";
import useUser from "../hooks/user.hook";

export default function UseAvatar({ id }) {
  const { user, isLoading, isError } = useUser(id);

  if (isLoading) return <Spinner />;
  if (isError) return "Error";
  return <Avatar src={user.avatar} name={user.name} />;
}
