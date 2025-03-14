import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import { useContext } from "react";

export default function ProtectedRoutes() {
  const { email, loading } = useContext(AuthContext); // Get auth state

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return email ? <Outlet /> : <Navigate to="/auth" replace />;
}
