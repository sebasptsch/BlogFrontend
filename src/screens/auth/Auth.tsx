import { Button, ButtonGroup, Center, Divider } from "@chakra-ui/react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { Outlet } from "react-router-dom";
const AuthScreen = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey="6Lf6ne4fAAAAAD7JmLtcYowY6XjCLTL38HKSY9Rb"
      scriptProps={{
        async: false, // optional, default to false,
        defer: false, // optional, default to false
        appendTo: "body", // optional, default to "head", can be "head" or "body",
        nonce: undefined, // optional, default undefined
      }}
    >
      <Outlet />
      <Divider my={4} />
      <Center>
        <ButtonGroup>
          <Button
            leftIcon={<FaGithub />}
            className="umami--click--githublogin-button"
            as="a"
            href="https://api.sebasptsch.dev/auth/github"
          >
            Github
          </Button>
          <Button
            leftIcon={<FaDiscord />}
            as="a"
            className="umami--click--discordlogin-button"
            href="https://api.sebasptsch.dev/auth/discord"
          >
            Discord
          </Button>
        </ButtonGroup>
      </Center>
    </GoogleReCaptchaProvider>
  );
};
export default AuthScreen;
