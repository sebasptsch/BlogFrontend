import {
  Button,
  ButtonGroup,
  Center,
  Divider,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
export default function DefaultAuth() {
  return (
    <>
      <Heading as="h1" textAlign={"center"}>
        Login/Signup
      </Heading>
      <Divider my={5} />
      <Center>
        <ButtonGroup>
          <Button as={Link} to="/auth/login">
            Login
          </Button>
          <Button as={Link} to="/auth/register">
            Register
          </Button>
        </ButtonGroup>
      </Center>
    </>
  );
}
