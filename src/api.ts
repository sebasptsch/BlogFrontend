import { ApiClient } from "./generated";

export const api = new ApiClient({
  BASE: "https://api.sebasptsch.dev",
  WITH_CREDENTIALS: true,
});
