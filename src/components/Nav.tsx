import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Container,
  Flex,
  IconButton,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import { useIsAdmin, useLoggedIn } from "@hooks";
import { logout } from "@utils";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSWRConfig } from "swr";

export default function Nav() {
  const { loggedIn } = useLoggedIn();
  const { isAdmin } = useIsAdmin();
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW="container.lg">
      <Flex m={3}>
        <Link to="">
          <Img src="" alt="SP Logo" />
        </Link>

        <Spacer />
        <ButtonGroup spacing={6}>
          <IconButton
            aria-label="switch theme"
            onClick={toggleColorMode}
            icon={colorMode === "dark" ? <MdDarkMode /> : <MdLightMode />}
          />
          {loggedIn ? (
            <>
              <Button onClick={() => logout(mutate)}>Logout</Button>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Profile
                </MenuButton>
                <MenuList>
                  <MenuItem as={Link} to="/profile">
                    My Account
                  </MenuItem>
                  {isAdmin ? (
                    <MenuItem as={Link} to="/admin">
                      Posts
                    </MenuItem>
                  ) : null}
                  {isAdmin ? (
                    <MenuItem as={Link} to="/images">
                      Images
                    </MenuItem>
                  ) : null}
                </MenuList>
              </Menu>
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
