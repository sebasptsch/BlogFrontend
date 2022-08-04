import axios from "axios";

const api = axios.create({ baseURL: "/api" });

export const fetcher = (data) =>
  api(data)
    .then((res) => res.data)
    .catch((e) => console.log("Error", e));
