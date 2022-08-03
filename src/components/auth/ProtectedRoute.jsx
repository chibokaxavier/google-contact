import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({ children }) => {
  const logged_in = useSelector((state) => state.authentication.logged_in);
  if (!logged_in) {
    return <Navigate to="/LogInPage" replace />;
  }

  return children;
};