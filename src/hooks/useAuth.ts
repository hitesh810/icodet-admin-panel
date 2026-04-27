import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginApi } from "../services/authService";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const loginUser = async (username: string, password: string) => {
    const res = await loginApi({ username, password });

    const token = res.data.data.token;
    const role = res.data.data.user.role;

    context.login(token, role);
  };

  return {
    ...context,
    loginUser,
  };
};