import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  Box,
  Chip,
  Stack,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { user } = useAuth();

  const load = async () => {
    try {
      const res = await api.get("/books");
      setBooks(res.data || []);
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to load books", { variant: "error" });
    }
  };

  const reserve = async (id) => {
    if (!user) {
      enqueueSnackbar("Please log in to reserve or borrow books", { variant: "info" });
      navigate("/login", { state: { from: "/books" } });
      return;
    }
    try {
      await api.post("/reservations", null, { params: { bookId: id } });
      enqueueSnackbar("Book reserved / added to waiting list", {
        variant: "success",
      });
      await load();
      navigate("/reservations");
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to create reservation", { variant: "error" });
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filteredBooks = useMemo(() => {
    const q = search.toLowerCase();
    return (books || []).filter(
      (b) =>
        b.title?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q) ||
        b.category?.toLowerCase().includes(q)
    );
  }, [books, search]);

  return (
    <Box sx={{ backgroundColor: "#FAFBFC", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Guest Banner if not logged in */}
        {!user && (
          <Box
            sx={{
              mb: 4,
              p: 3,
              borderRadius: 3,
              background: "linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(8, 145, 178, 0.08) 100%)",
              border: "1px solid rgba(6, 182, 212, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
              boxShadow: "0 4px 20px rgba(6, 182, 212, 0.08)",
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", mb: 0.5, display: "flex", alignItems: "center", gap: 1 }}>
                📖 Welcome to Library Pro!
              </Typography>
              <Typography variant="body2" sx={{ color: "#475569" }}>
                Browse our complete book catalog. Whenever you want to reserve a book or borrow a copy, simply log in to your account.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Button
                variant="outlined"
                startIcon={<LoginIcon />}
                onClick={() => navigate("/login", { state: { from: "/books" } })}
                sx={{
                  borderColor: "#06B6D4",
                  color: "#0891B2",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: 2,
                  "&:hover": {
                    borderColor: "#0891B2",
                    backgroundColor: "rgba(6, 182, 212, 0.1)",
                  },
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                startIcon={<PersonAddIcon />}
                onClick={() => navigate("/register")}
                sx={{
                  background: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: 2,
                  boxShadow: "0 4px 14px rgba(6, 182, 212, 0.3)",
                }}
              >
                Register
              </Button>
            </Box>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 4,
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: "#1A2332",
              }}
            >
              📚 Discover Books
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Explore our collection and reserve your next great read
            </Typography>
          </Box>

          <TextField
            size="small"
            placeholder="Search by title, author, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#667085", mr: 1 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: { xs: "100%", sm: 320 },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#fff",
                transition: "all 0.2s ease",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(45, 90, 61, 0.1)",
                },
                "&.Mui-focused": {
                  boxShadow: "0 8px 16px rgba(45, 90, 61, 0.15)",
                },
              },
            }}
          />
        </Box>

        <Grid container spacing={3}>
          {filteredBooks.map((b) => (
            <Grid item xs={12} sm={6} md={4} key={b.id}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  border: "1px solid #E5E7EB",
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: "linear-gradient(90deg, #2D5A3D 0%, #E8B4A8 100%)",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.3s ease",
                    zIndex: 1,
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
                {b.coverImageUrl ? (
                  <CardMedia
                    component="img"
                    height="240"
                    image={b.coverImageUrl}
                    alt={b.title}
                    sx={{
                      objectFit: "cover",
                      background:
                        "linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 240,
                      background: "linear-gradient(135deg, #2D5A3D 0%, #1F3D2C 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BookmarkIcon
                      sx={{ fontSize: 80, color: "rgba(255,255,255,0.3)" }}
                    />
                  </Box>
                )}

                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 700, color: "#1A2332" }}
                  >
                    {b.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    by {b.author}
                  </Typography>

                  <Stack direction="row" spacing={1} mt={2} mb={2}>
                    {b.category && (
                      <Chip
                        label={b.category}
                        size="small"
                        sx={{
                          background:
                            "linear-gradient(135deg, #E8B4A8 0%, #E89B88 100%)",
                          color: "#fff",
                          fontWeight: 600,
                        }}
                      />
                    )}
                    {b.isbn && (
                      <Chip
                        label={`ISBN: ${b.isbn}`}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: "#E5E7EB",
                          color: "#667085",
                        }}
                      />
                    )}
                  </Stack>

                  <Box
                    sx={{
                      mt: 2,
                      p: 1,
                      borderRadius: 2,
                      background: "#F0F9F7",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "#2D5A3D", fontWeight: 600 }}>
                      Available: {b.availableCopies} / {b.totalCopies}
                    </Typography>
                  </Box>

                  {b.description && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: 1.4,
                      }}
                    >
                      {b.description}
                    </Typography>
                  )}
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    size="small"
                    variant="contained"
                    onClick={() => reserve(b.id)}
                    sx={{
                      background:
                        b.availableCopies > 0
                          ? "linear-gradient(135deg, #06b6a4 0%, #0ea5a4 100%)"
                          : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                      fontWeight: 600,
                      transition: "all 0.3s ease",
                      textTransform: "none",
                      fontSize: "0.9rem",
                    }}
                  >
                    {!user
                      ? (b.availableCopies > 0 ? "Login to Reserve" : "Login for Waitlist")
                      : (b.availableCopies > 0 ? "Reserve Book" : "Join Waiting List")}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}

          {filteredBooks.length === 0 && (
            <Grid item xs={12}>
              <Box
                sx={{
                  textAlign: "center",
                  py: 6,
                  background: "#fff",
                  borderRadius: 3,
                  border: "1px solid #E5E7EB",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#667085", fontWeight: 600, mb: 1 }}
                >
                  📖 No Books Found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search terms
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}