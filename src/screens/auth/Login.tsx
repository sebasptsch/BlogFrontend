import {
  Button,
  Center,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { login } from "@utils";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { Helmet } from "react-helmet";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSWRConfig } from "swr";

export default function Login() {
  interface LoginForm {
    username: string;
    password: string;
    captchaToken: string;
  }

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({});
  const navigate = useNavigate();
  const alert = useAlert();
  const { mutate } = useSWRConfig();
  const onSubmit: SubmitHandler<LoginForm> = (values) =>
    login(mutate, values, alert);
  const onVerifyCaptcha = (token) => {
    setValue("captchaToken", token);
  };

  useEffect(() => {
    register("captchaToken", { required: true });
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Login to your account." />
        </Helmet>
        <Heading as="h1" textAlign={"center"}>
          Login
        </Heading>
        <Divider my={5} />
        <Container>
          <FormControl isInvalid={!!errors.username}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              type="text"
              {...register("username", {
                required: "Required",
              })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              {...register("password", {
                required: "Required",
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <GoogleReCaptcha onVerify={onVerifyCaptcha} />
          <Center>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Center>
        </Container>
      </form>
    </>
  );
}
