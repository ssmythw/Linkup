import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoutes() {
  const id = Cookies.get("user_id");
  return id ? <Outlet /> : <Navigate to="/login" />;
}
