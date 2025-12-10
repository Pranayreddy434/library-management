import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navButtons = [
    { label: "Books", path: "/books", icon: <CollectionsBookmarkIcon /> },
    { label: "My Reservations", path: "/reservations", icon: <BookmarkIcon /> },
  ];

  const adminButtons = [
    { label: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
    { label: "All Reservations", path: "/admin/reservations", icon: <BookmarkIcon /> },
    { label: "Users", path: "/admin/users", icon: <ManageAccountsIcon /> },
    { label: "Import Book", path: "/admin/import-book", icon: <FileDownloadIcon /> },
  ];

  const allButtons = [...navButtons, ...(user?.role === "ADMIN" ? adminButtons : [])];

  const drawerContent = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(6, 182, 212, 0.2)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <MenuBookIcon sx={{ fontSize: 24, color: "#06B6D4" }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Library Pro
          </Typography>
        </Box>
        <IconButton
          onClick={() => setMobileOpen(false)}
          sx={{
            color: "#06B6D4",
            "&:hover": { backgroundColor: "rgba(6, 182, 212, 0.1)" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ flex: 1, py: 2 }}>
        {allButtons.map((btn, idx) => (
          <ListItemButton
            key={btn.path}
            onClick={() => {
              navigate(btn.path);
              setMobileOpen(false);
            }}
            sx={{
              mx: 1,
              mb: 1,
              borderRadius: 2,
              color: isActive(btn.path) ? "#06B6D4" : "#94A3B8",
              backgroundColor: isActive(btn.path)
                ? "rgba(6, 182, 212, 0.15)"
                : "transparent",
              transition: "all 0.3s ease",
              borderLeft: isActive(btn.path) ? "3px solid #06B6D4" : "3px solid transparent",
              paddingLeft: isActive(btn.path) ? "19px" : "22px",
              "&:hover": {
                backgroundColor: "rgba(6, 182, 212, 0.1)",
                color: "#06B6D4",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "inherit",
                minWidth: 40,
              }}
            >
              {btn.icon}
            </ListItemIcon>
            <ListItemText
              primary={btn.label}
              primaryTypographyProps={{
                fontSize: "0.95rem",
                fontWeight: isActive(btn.path) ? 700 : 600,
              }}
            />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ borderColor: "rgba(6, 182, 212, 0.2)" }} />

      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          endIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
            fontWeight: 700,
            textTransform: "none",
            fontSize: "0.95rem",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 15px 35px rgba(239, 68, 68, 0.3)",
              transform: "translateY(-2px)",
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Top Navigation Bar */}
      <AppBar position="fixed" elevation={0} sx={{ zIndex: 1100, top: 0 }}>
        <Toolbar
          sx={{
            py: 1.5,
            px: { xs: 1, sm: 2, md: 3 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
            onClick={() => navigate("/books")}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 20px rgba(6, 182, 212, 0.3)",
              }}
            >
              <MenuBookIcon sx={{ fontSize: 24, color: "#fff" }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: { xs: "none", sm: "block" },
                }}
              >
                Library Pro
              </Typography>
            </Box>
          </Box>

          {/* Desktop Navigation */}
          {user && (
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
                flex: 1,
                ml: 4,
              }}
            >
              {navButtons.map((btn) => (
                <Button
                  key={btn.path}
                  onClick={() => navigate(btn.path)}
                  sx={{
                    color: isActive(btn.path) ? "#06B6D4" : "#94A3B8",
                    fontWeight: isActive(btn.path) ? 700 : 600,
                    position: "relative",
                    fontSize: "0.95rem",
                    transition: "all 0.3s ease",
                    px: 2,
                    py: 1,
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 4,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)",
                      borderRadius: "2px 2px 0 0",
                      transform: isActive(btn.path) ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "center",
                      transition: "transform 0.3s ease",
                    },
                    "&:hover": {
                      color: "#06B6D4",
                      backgroundColor: "rgba(6, 182, 212, 0.1)",
                      borderRadius: 1,
                    },
                  }}
                >
                  {btn.label}
                </Button>
              ))}

              {user.role === "ADMIN" && (
                <>
                  <Divider
                    orientation="vertical"
                    sx={{
                      borderColor: "rgba(6, 182, 212, 0.2)",
                      height: 24,
                      mx: 1,
                    }}
                  />
                  {adminButtons.map((btn) => (
                    <Button
                      key={btn.path}
                      onClick={() => navigate(btn.path)}
                      sx={{
                        color: isActive(btn.path) ? "#06B6D4" : "#94A3B8",
                        fontWeight: isActive(btn.path) ? 700 : 600,
                        fontSize: "0.9rem",
                        transition: "all 0.3s ease",
                        px: 1.5,
                        py: 1,
                        "&:hover": {
                          color: "#06B6D4",
                          backgroundColor: "rgba(6, 182, 212, 0.1)",
                          borderRadius: 1,
                        },
                      }}
                    >
                      {btn.label}
                    </Button>
                  ))}
                </>
              )}
            </Box>
          )}

          {/* Desktop Logout */}
          {user && (
            <Button
              onClick={handleLogout}
              endIcon={<LogoutIcon />}
              sx={{
                display: { xs: "none", md: "flex" },
                color: "#94A3B8",
                fontSize: "0.95rem",
                transition: "all 0.3s ease",
                px: 2,
                py: 1,
                "&:hover": {
                  color: "#06B6D4",
                  backgroundColor: "rgba(6, 182, 212, 0.1)",
                  borderRadius: 1,
                },
              }}
            >
              Logout
            </Button>
          )}

          {/* Mobile Menu Button */}
          {user && (
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setMobileOpen(true)}
              sx={{
                display: { xs: "flex", md: "none" },
                color: "#06B6D4",
                fontSize: 28,
                "&:hover": {
                  backgroundColor: "rgba(6, 182, 212, 0.1)",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content Area */}
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          pt: { xs: "64px", sm: "64px" },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-50%",
            width: "200%",
            height: "200%",
            background:
              "radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
            animation: "float 20s ease-in-out infinite",
            zIndex: 0,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            right: "-50%",
            width: "200%",
            height: "200%",
            background:
              "radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)",
            animation: "float 25s ease-in-out infinite reverse",
            zIndex: 0,
          },
          "@keyframes float": {
            "0%, 100%": { transform: "translate(0, 0)" },
            "50%": { transform: "translate(30px, 30px)" },
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1, p: { xs: 1.5, sm: 2, md: 3 } }}>
          {children}
        </Box>
      </Box>
    </>
  );
}