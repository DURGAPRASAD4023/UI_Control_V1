import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("google_access_token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
