// frontend/src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import BooksPage from "./pages/BooksPage.jsx";
import ReservationsPage from "./pages/ReservationsPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import ImportBookPage from "./pages/ImportBookPage.jsx";
import AdminReservationsPage from "./pages/AdminReservationsPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Layout from "./components/Layout.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";

export default function App() {
  return (
    <Routes>
      {/* Books page is the public homepage */}
      <Route
        path="/"
        element={
          <Layout>
            <BooksPage />
          </Layout>
        }
      />
      <Route
        path="/books"
        element={
          <Layout>
            <BooksPage />
          </Layout>
        }
      />

      {/* Public auth routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Protected user routes */}
      <Route
        path="/reservations"
        element={
          <ProtectedRoute>
            <Layout>
              <ReservationsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Protected admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            <Layout>
              <AdminDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/reservations"
        element={
          <ProtectedRoute requireAdmin>
            <Layout>
              <AdminReservationsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute requireAdmin>
            <Layout>
              <UsersPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/import-book"
        element={
          <ProtectedRoute requireAdmin>
            <Layout>
              <ImportBookPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Catch-all redirect to homepage */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
