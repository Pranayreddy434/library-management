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

export default function App() {
  return (
    <Routes>
      {/* redirect root to /books */}
      <Route path="/" element={<Navigate to="/books" />} />

      {/* public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* protected user routes */}
      <Route
        path="/books"
        element={
          <ProtectedRoute>
            <Layout>
              <BooksPage />
            </Layout>
          </ProtectedRoute>
        }
      />

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

      {/* protected admin routes */}
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
    </Routes>
  );
}
