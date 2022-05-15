import {
  Button,
  ButtonGroup,
  Container,
  Flex,
  Img,
  Spacer,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <Container maxW="container.lg">
      <Flex m={3}>
        <Link to="">
          <Img src="" alt="SP Logo" />
        </Link>

        <Spacer />
        <ButtonGroup spacing={6}>
          <Button as={Link} to="/auth/login">
            Sign In
          </Button>
          <Button as={Link} to="/auth/register">
            Sign Up
          </Button>
        </ButtonGroup>
      </Flex>
    </Container>
  );
}
