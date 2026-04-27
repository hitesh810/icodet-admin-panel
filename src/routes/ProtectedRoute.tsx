import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }: any) => {
  const { token } = useAuth();

  const storedToken = token || localStorage.getItem("token");

  if (!storedToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;