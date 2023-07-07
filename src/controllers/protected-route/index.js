import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.user);
  const path = window.location.pathname.replace("/", "");
  return token && token.trim() !== "" ? (
    children
  ) : (
    <Navigate to={"/login-register?redirect=" + path} />
  );
};

export default ProtectedRoute;
