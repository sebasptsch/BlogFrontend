import axios from "axios";

const api = axios.create({
  baseURL: "https://api.sebasptsch.dev",
  withCredentials: true,
});

export const fetcher = (data) =>
  api(data)
    .then((res) => res.data)
    .catch((e) => console.log("Error", e));
