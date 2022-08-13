import { Button, ButtonGroup, Center, Divider } from "@chakra-ui/react";
import { createOAuthWindow } from "@utils";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { mutate } from "swr";
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
            onClick={() =>
              createOAuthWindow(
                "https://api.sebasptsch.dev/auth/github",
                mutate
              )
            }
          >
            Github
          </Button>
          <Button
            leftIcon={<FaDiscord />}
            className="umami--click--discordlogin-button"
            onClick={() =>
              createOAuthWindow(
                "https://api.sebasptsch.dev/auth/discord",
                mutate
              )
            }
          >
            Discord
          </Button>
        </ButtonGroup>
      </Center>
    </GoogleReCaptchaProvider>
  );
};
export default AuthScreen;
