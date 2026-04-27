// services/licence.service.ts


import { API } from "./api";

const APIENDPOINT = "/admin";

export const getSchools = () => {
  return API.get(`${APIENDPOINT}/schools`);
};


export const getLicences = async (params: any) => {
  const res = await API.get(`${APIENDPOINT}/licences`, { params });
  return res.data;
};

export const updateLicenceStatus = async (data: {
  licence_id: number;
  status: string;
}) => {
  const res = await API.patch(`${APIENDPOINT}/licence/status`, data);
  return res.data;
};

export const createLicence = async (data: {
  licence_key: string;
  licence_type: string;
  school_id: number;
}) => {
  const res = await API.post("/api/admin/create-licence", data);
  return res.data;
};
// services/licence.service.ts

export const uploadLicences = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await API.post(
    "/api/admin/upload-licences",
    formData
  );

  return res.data;
};