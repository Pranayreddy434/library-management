import { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import api from "../api/axiosClient.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);
      navigate("/books");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #081029 0%, #063840 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          width: 400,
          height: 400,
          background: "rgba(232, 180, 168, 0.1)",
          borderRadius: "50%",
          top: -100,
          right: -100,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          width: 300,
          height: 300,
          background: "rgba(232, 180, 168, 0.05)",
          borderRadius: "50%",
          bottom: -50,
          left: -50,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            backdropFilter: "blur(10px)",
            background: "rgba(255, 255, 255, 0.98)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            animation: "slideUp 0.5s ease-out",
            "@keyframes slideUp": {
              from: { opacity: 0, transform: "translateY(20px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
                boxShadow: "0 8px 16px rgba(45, 90, 61, 0.2)",
              }}
            >
              <MenuBookIcon sx={{ fontSize: 32, color: "#fdfafaff" }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Login to access your library account
            </Typography>
          </Box>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              margin="normal"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* ✅ Password with Eye Icon */}
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Forgot password */}
            <Box sx={{ textAlign: "right", mt: 1 }}>
              <Link
                to="/forgot-password"
                style={{
                  fontSize: "0.85rem",
                  color: "#0891B2",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Forgot password?
              </Link>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.2,
                fontSize: "1rem",
                background:
                  "linear-gradient(135deg, #06b6a4 0%, #0ea5a4 100%)",
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Register */}
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "#2D5A3D",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Register here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
