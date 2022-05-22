import { AlertContainer } from "react-alert";
import { ScopedMutator } from "swr/dist/types";
import { api } from "./api";

interface LoginData {
  password: string;
  username: string;
}

export const logout = (mutate: ScopedMutator<any>) => {
  api.post("/auth/logout").then(() => {
    mutate("/users/me");
    mutate("/auth/loggedIn");
  });
};

export const login = async (
  mutate: ScopedMutator<any>,
  data: LoginData,
  alert: AlertContainer
) =>
  new Promise<void>((resolve, reject) => {
    api
      .post("/auth/signin", data)
      .then((result) => {
        mutate("/users/me");
        mutate("/auth/loggedIn");
        mutate("/posts/me");
        mutate("/posts");
        resolve();
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          alert.info(error.response.data.message);
        } else if (error.request) {
          // No Response
        } else {
          console.log("Error", error.message);
        }
        reject();
      });
  });

export const deleteAccount = async (
  mutate: ScopedMutator<any>,
  alert: AlertContainer
) =>
  new Promise<void>((resolve, reject) => {
    api
      .delete("/users/me")
      .then(() => {
        logout(mutate);
        resolve();
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          alert.info(error.response.data.message);
        } else if (error.request) {
          // No Response
        } else {
          console.log("Error", error.message);
        }
        reject();
      });
  });
