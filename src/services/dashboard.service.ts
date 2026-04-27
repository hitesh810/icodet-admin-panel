import { API } from "./api";

export const getDashboardStats = () => {
  return API.get("/admin/dashboard");
};

export const getMonthlyUsage = () => {
  return API.get("/admin/monthly-usage");
};

export const getDistribution = () => {
  return API.get("/admin/licence-distribution");
};