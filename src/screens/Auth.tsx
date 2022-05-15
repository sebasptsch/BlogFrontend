import { Box, Button, ButtonGroup, Center, Divider } from "@chakra-ui/react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { Outlet } from "react-router-dom";
export default function AuthScreen() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey="6Lf6ne4fAAAAAD7JmLtcYowY6XjCLTL38HKSY9Rb"
      scriptProps={{
        async: false, // optional, default to false,
        defer: false, // optional, default to false
        appendTo: "head", // optional, default to "head", can be "head" or "body",
        nonce: undefined, // optional, default undefined
      }}
    >
      <Center>
        <Box maxW="md" borderWidth="1px" borderRadius="lg" p={5}>
          <Outlet />
          <Divider my={4} />
          <ButtonGroup>
            <Button
              as="a"
              href="http://localhost:3000/auth/github"
              leftIcon={<FaGithub />}
            >
              Github
            </Button>
            <Button
              as="a"
              href="http://localhost:3000/auth/discord"
              leftIcon={<FaDiscord />}
            >
              Discord
            </Button>
          </ButtonGroup>
        </Box>
      </Center>
    </GoogleReCaptchaProvider>
  );
}
