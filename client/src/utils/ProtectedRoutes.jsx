import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes() {
  const user = localStorage.getItem("CatCallLoggedInUser");

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
}
