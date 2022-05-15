import axios from "axios";

export const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);
