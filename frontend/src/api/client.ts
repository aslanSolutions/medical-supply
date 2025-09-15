import axios from "axios";

export const http = axios.create({
  baseURL: "http://213.113.151.104/api/v1",
  timeout: 10_000,
});
