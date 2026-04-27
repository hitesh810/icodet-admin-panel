import { API } from "./api";

export const loginApi = (data: {
  username: string;
  password: string;
}) => {
  return API.post("/auth/login", data);
};