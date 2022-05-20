import {
  Avatar,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Img,
  Spacer,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSWRConfig } from "swr";
import useMe from "../hooks/me.hook";
import { api } from "../utils";

export default function Nav() {
  const { user, isError, isLoading } = useMe();
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  return (
    <Container maxW="container.lg">
      <Flex m={3}>
        <Link to="">
          <Img src="" alt="SP Logo" />
        </Link>

        <Spacer />
        <ButtonGroup spacing={6}>
          {user ? (
            <>
              <Button
                onClick={() => {
                  api.post("/auth/logout", undefined).then(() => {
                    mutate("/users/me");
                    navigate("/");
                  });
                }}
              >
                Logout
              </Button>
              <Button
                as={Link}
                to="/users/me"
                leftIcon={
                  <Avatar
                    size="sm"
                    name={user.name}
                    src={
                      user?.avatar?.id
                        ? `/api/images/${user.avatar.id}`
                        : undefined
                    }
                  />
                }
              >
                Profile
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} to="/auth/login">
                Sign In
              </Button>
              <Button as={Link} to="/auth/register">
                Sign Up
              </Button>
            </>
          )}
        </ButtonGroup>
      </Flex>
    </Container>
  );
}
