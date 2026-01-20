// frontend/src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user } = useAuth();
  const location = useLocation();

  debugger; // 🔴 BREAKPOINT HERE

  console.log("ProtectedRoute hit");
  console.log("Current path:", location.pathname);
  console.log("User:", user);
  console.log("Require admin:", requireAdmin);

  if (!user) {
    console.log("User not logged in → redirect to /login");
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user.role !== "ADMIN") {
    console.log("Not admin → redirect to /books");
    return <Navigate to="/books" replace />;
  }

  return children;
}
