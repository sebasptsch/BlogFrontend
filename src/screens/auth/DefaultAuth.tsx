import {
  Button,
  ButtonGroup,
  Center,
  Divider,
  Heading,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
const DefaultAuth: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Login or Register</title>
        <meta name="description" content="Login to or register an account." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Heading as="h1" textAlign={"center"}>
        Login/Signup
      </Heading>
      <Divider my={5} />
      <Center>
        <ButtonGroup>
          <Button
            as={Link}
            to="/auth/login"
            className="umami--click--signin-button"
          >
            Login
          </Button>
          <Button
            as={Link}
            to="/auth/register"
            className="umami--click--signup-button"
          >
            Register
          </Button>
        </ButtonGroup>
      </Center>
    </>
  );
};
export default DefaultAuth;
