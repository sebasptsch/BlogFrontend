import { Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export default function DefaultAuth() {
  return (
    <HStack>
      <Button as={Link} to="/auth/login">
        Login
      </Button>
      <Button as={Link} to="/auth/register">
        Register
      </Button>
    </HStack>
  );
}
