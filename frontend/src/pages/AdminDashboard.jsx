import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import GroupIcon from "@mui/icons-material/Group";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ReceiptIcon from "@mui/icons-material/Receipt";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const adminCards = [
    {
      title: "📚 Books Management",
      description: "Manage library books & import from Open Library",
      icon: <LibraryBooksIcon sx={{ fontSize: 40, color: "#E8B4A8" }} />,
      action: () => navigate("/admin/import-book"),
      buttonText: "Import Book",
      gradient: "linear-gradient(135deg, #06b6a4 0%, #0ea5a4 100%)",
    },
    {
      title: "👥 Users",
      description: "View users and their reservation history",
      icon: <GroupIcon sx={{ fontSize: 40, color: "#E8B4A8" }} />,
      action: () => navigate("/admin/users"),
      buttonText: "View Users",
      gradient: "linear-gradient(135deg, #06b6a4 0%, #0ea5a4 100%)",
    },
    {
      title: "📋 Reservations",
      description: "Manage all reservations and track returns",
      icon: <ReceiptIcon sx={{ fontSize: 40, color: "#E8B4A8" }} />,
      action: () => navigate("/admin/reservations"),
      buttonText: "View Reservations",
      gradient: "linear-gradient(135deg, #06b6a4 0%, #0ea5a4 100%)",
      
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#FAFBFC", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: "#1A2332",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            ⚙️ Admin Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your library system and monitor all activities
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {adminCards.map((card, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  border: "1px solid #E5E7EB",
                  background: "#fff",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: card.gradient,
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.3s ease",
                  },
                  "&:hover": {
                    boxShadow: "0 20px 25px -5px rgba(45, 90, 61, 0.15)",
                    transform: "translateY(-8px)",
                    "&::before": {
                      transform: "scaleX(1)",
                    },
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 2,
                        background: "#F0F9F7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {card.icon}
                    </Box>
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: "#1A2332",
                    }}
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3, lineHeight: 1.5 }}
                  >
                    {card.description}
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={card.action}
                    sx={{
                      background: card.gradient,
                      fontWeight: 600,
                      transition: "all 0.3s ease",
                      textTransform: "none",
                      fontSize: "0.95rem",
                    }}
                  >
                    {card.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 3,
            background: "linear-gradient(135deg, #F0F9F7 0%, #F5F8F7 100%)",
            border: "1px solid #E5E7EB",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 2, color: "#2D5A3D" }}
          >
            📊 Quick Stats
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  p: 2,
                  background: "#fff",
                  borderRadius: 2,
                  border: "1px solid #E5E7EB",
                  textAlign: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Total Books
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "#2D5A3D", mt: 1 }}
                >
                  —
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  p: 2,
                  background: "#fff",
                  borderRadius: 2,
                  border: "1px solid #E5E7EB",
                  textAlign: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Active Users
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "#E8B4A8", mt: 1 }}
                >
                  —
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  p: 2,
                  background: "#fff",
                  borderRadius: 2,
                  border: "1px solid #E5E7EB",
                  textAlign: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Borrowed Books
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "#F59E0B", mt: 1 }}
                >
                  —
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  p: 2,
                  background: "#fff",
                  borderRadius: 2,
                  border: "1px solid #E5E7EB",
                  textAlign: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Pending Returns
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "#DC2626", mt: 1 }}
                >
                  —
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

// import { Grid } from "@mui/material";