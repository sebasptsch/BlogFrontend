import { AlertContainer } from "react-alert";
import { ScopedMutator } from "swr/dist/types";
import { api } from "../api";

interface LoginData {
  password: string;
  username: string;
}

export const logout = (mutate: ScopedMutator<any>) => {
  api.authentication.logout().then(() => {
    mutate("/users/me");
    mutate("/auth/loggedIn");
    mutate("/auth/isAdmin");
  });
};

export const login = async (
  mutate: ScopedMutator<any>,
  data: LoginData,
  alert: AlertContainer
) =>
  new Promise<void>((resolve, reject) => {
    api.authentication
      .signin(data)
      .then((result) => {
        mutate("/users/me");
        mutate("/auth/loggedIn");
        mutate("/posts/me");
        mutate("/posts");
        resolve();
      })
      .catch((response) => {
        reject(response);
      });
  });

export const deleteAccount = async (
  mutate: ScopedMutator<any>,
  alert: AlertContainer
) =>
  new Promise<void>((resolve, reject) => {
    api.users
      .deleteUser()
      .then(() => {
        logout(mutate);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });

export const deleteImage = async (
  mutate: ScopedMutator<any>,
  imageId: number,
  alert: AlertContainer
) =>
  new Promise<void>((resolve, reject) => {
    api.images
      .deleteImage(imageId)
      .then(() => {
        mutate("https://api.sebasptsch.dev/images");
        mutate(`https://api.sebasptsch.dev/images/${imageId}`);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });

export const uploadImage = (image: File, name?: string) =>
  new Promise((resolve, reject) => {
    api.images
      .addImage({
        file: image,
        name: name ?? image.name,
      })
      .then((result) => {
        resolve(result);
      })
      .catch(reject);
  });
