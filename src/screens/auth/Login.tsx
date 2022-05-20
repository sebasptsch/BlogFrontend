import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSWRConfig } from "swr";
import { api } from "../../utils";

export default function Login() {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({});
  const navigate = useNavigate();
  const alert = useAlert();
  const { mutate } = useSWRConfig();
  const onSubmit = (values: any) =>
    new Promise((resolve, reject) => {
      api
        .post("/auth/signin", values)
        .then((result) => {
          alert.success("Successfully logged in!");
          // mutate("/users/me");
          navigate("/users/me");
          // resolve(result.data.access_token);
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Login</Heading>
        <FormControl isInvalid={errors.username}>
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

        <FormControl isInvalid={errors.password}>
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
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </>
  );
}
