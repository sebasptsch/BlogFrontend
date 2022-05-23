import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Container,
  Flex,
  IconButton,
  Image,
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
import Logo from "../logo.svg";

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
          <Image maxHeight={10} src={Logo} />
        </Link>

        <Spacer />
        <ButtonGroup spacing={6}>
          <IconButton
            aria-label="switch theme"
            onClick={toggleColorMode}
            className="umami--click--theme-button"
            icon={colorMode === "dark" ? <MdDarkMode /> : <MdLightMode />}
          />
          {loggedIn ? (
            <>
              <Button
                onClick={() => logout(mutate)}
                className="umami--click--logout-button"
              >
                Logout
              </Button>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Profile
                </MenuButton>
                <MenuList>
                  <MenuItem
                    as={Link}
                    to="/profile"
                    className="umami--click--profile-button"
                  >
                    My Account
                  </MenuItem>
                  {isAdmin ? (
                    <MenuItem
                      as={Link}
                      to="/admin"
                      className="umami--click--posts-button"
                    >
                      Posts
                    </MenuItem>
                  ) : null}
                  {isAdmin ? (
                    <MenuItem
                      as={Link}
                      to="/images"
                      className="umami--click--images-button"
                    >
                      Images
                    </MenuItem>
                  ) : null}
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <Button
                as={Link}
                to="/auth/login"
                className="umami--click--signin-button"
              >
                Sign In
              </Button>
              <Button
                as={Link}
                to="/auth/register"
                className="umami--click--signup-button"
              >
                Sign Up
              </Button>
            </>
          )}
        </ButtonGroup>
      </Flex>
    </Container>
  );
}
