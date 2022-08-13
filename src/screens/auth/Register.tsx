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
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { Helmet } from "react-helmet";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSWRConfig } from "swr";
import { api } from "../../api";

const Register: React.FC = () => {
  interface RegisterForm {
    username: string;
    password: string;
    passwordconfirm: string;
    captchaToken: string;
  }
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>();
  const alert = useAlert();
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const onSubmit: SubmitHandler<RegisterForm> = (values) =>
    new Promise((resolve, reject) => {
      api.authentication
        .register(values)
        .then((data) => {
          alert.success("Successfully logged in!");
          mutate("/auth/loggedIn");
          navigate("/profile");

          resolve(data.access_token);
        })
        .catch((result) => {
          // console.log(result);
          alert.error("There was a problem logging in.");
          reject(result.message);
        });
    });

  const onVerifyCaptcha = (token) => {
    setValue("captchaToken", token);
  };

  useEffect(() => {
    register("captchaToken", { required: true });
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Login to your account." />
      </Helmet>
      <Heading as="h1" textAlign={"center"}>
        Register
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
        <FormControl isInvalid={!!errors.passwordconfirm}>
          <FormLabel htmlFor="password">Confirm Password</FormLabel>
          <Input
            id="password"
            type="password"
            {...register("passwordconfirm", {
              required: "Required",
              validate: (value) =>
                getValues("password") === value || "Passwords do not match",
            })}
          />
          <FormErrorMessage>
            {!!errors.passwordconfirm && errors.passwordconfirm.message}
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
  );
};
export default Register;
