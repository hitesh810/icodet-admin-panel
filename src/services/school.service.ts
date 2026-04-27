// services/school.service.ts
import { API } from "./api";

const APIENDPOINT = "/admin";

export const getSchools = async () => {
  const res = await API.get(`${APIENDPOINT}/schools`);
  return res.data;
};
