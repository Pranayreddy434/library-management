import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  InputAdornment,
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GetAppIcon from "@mui/icons-material/GetApp";
import { useSnackbar } from "notistack";
import api from "../api/axiosClient.js";

export default function ImportBookPage() {
  const [query, setQuery] = useState("");
  const [docs, setDocs] = useState([]);
  const [copies, setCopies] = useState(3);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const search = async () => {
    if (!query.trim()) {
      enqueueSnackbar("Please enter a search query", { variant: "warning" });
      return;
    }
    try {
      setLoading(true);
      const res = await api.get("/admin/books/search-external", {
        params: { query },
      });
      setDocs(res.data.docs || []);
      if (!res.data.docs || res.data.docs.length === 0) {
        enqueueSnackbar("No books found. Try different keywords", {
          variant: "info",
        });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to search Open Library", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const importBook = async (doc) => {
    try {
      setImporting(doc.key);
      const body = {
        title: doc.title,
        author: doc.author_name?.[0] || "Unknown",
        isbn: doc.isbn?.[0] || null,
        category: doc.subject?.[0] || "General",
        totalCopies: copies,
        coverImageUrl: doc.key
          ? `https://covers.openlibrary.org/b/olid/${doc.key.replace(
              "/works/",
              ""
            )}-M.jpg`
          : null,
        description: `Imported from Open Library. First published: ${
          doc.first_publish_year || "N/A"
        }`,
      };
      await api.post("/admin/books/import", body);
      enqueueSnackbar("Book imported successfully", { variant: "success" });
      setDocs(docs.filter((d) => d.key !== doc.key));
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to import book", { variant: "error" });
    } finally {
      setImporting(null);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#FAFBFC", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
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
            📥 Import Book from Open Library
          </Typography>
          <Typography variant="body2" color="white">
            Search and quickly add books to your library catalog
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            background: "#fff",
          }}
        >
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
            <TextField
              label="Search by title, author, or ISBN..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && search()}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#667085", mr: 1 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
            <Button
              variant="contained"
              onClick={search}
              disabled={loading}
              sx={{
                minWidth: 140,
                background:  "linear-gradient(135deg, #06b6a4 0%, #0ea5a4 100%)",
                fontWeight: 600,
              }}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </Stack>

          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              background: "#F0F9F7",
              border: "1px solid #D0E8E4",
            }}
          >
            <Typography variant="body2" sx={{ color: "#2D5A3D", fontWeight: 600 }}>
              📚 Number of copies to add:
            </Typography>
            <TextField
              type="number"
              value={copies}
              onChange={(e) =>
                setCopies(Math.max(1, parseInt(e.target.value || "1", 10)))
              }
              inputProps={{ min: 1, max: 100 }}
              sx={{ width: 120, mt: 1 }}
            />
          </Box>
        </Paper>

        {loading && (
          <Stack spacing={2}>
            {[1, 2, 3].map((idx) => (
              <Card key={idx} elevation={0} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Skeleton variant="text" width="60%" height={24} />
                  <Skeleton variant="text" width="40%" height={16} sx={{ mt: 1 }} />
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}

        {!loading && docs.length > 0 && (
          <Typography
            variant="body2"
            sx={{
              color: "#2D5A3D",
              fontWeight: 600,
              mb: 2,
            }}
          >
            ✨ Found {docs.length} result{docs.length > 1 ? "s" : ""}
          </Typography>
        )}

        <List sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {docs.map((d, i) => (
            <Card
              key={i}
              elevation={0}
              sx={{
                borderRadius: 2,
                border: "1px solid #E5E7EB",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 8px 16px rgba(45, 90, 61, 0.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <ListItem
                sx={{
                  py: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
                secondaryAction={
                  <Button
                    variant="contained"
                    size="small"
                    disabled={importing === d.key}
                    onClick={() => importBook(d)}
                    endIcon={<GetAppIcon />}
                    sx={{
                      background:  "linear-gradient(135deg, #06b6a4 0%, #0ea5a4 100%)",
                      fontWeight: 600,
                    }}
                  >
                    {importing === d.key ? "Importing..." : "Import"}
                  </Button>
                }
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 700, color: "#e9edf3ff" }}
                    >
                      {d.title}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        color: "#667085",
                        mt: 0.5,
                        lineHeight: 1.5,
                      }}
                    >
                      by {d.author_name?.join(", ") || "Unknown author"}
                      {" • "}
                      {d.first_publish_year || "Year N/A"}
                      {d.isbn?.[0] && ` • ISBN: ${d.isbn[0]}`}
                    </Typography>
                  }
                />
              </ListItem>
            </Card>
          ))}

          {!loading && docs.length === 0 && query && (
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                border: "1px dashed #E5E7EB",
                p: 4,
              }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                sx={{ fontWeight: 500 }}
              >
                📖 No results found for "{query}"
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ mt: 1 }}
              >
                Try searching with different keywords or check the spelling
              </Typography>
            </Card>
          )}

          {!loading && docs.length === 0 && !query && (
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                border: "1px dashed #E5E7EB",
                p: 4,
              }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                sx={{ fontWeight: 500 }}
              >
                🔍 Start searching to import books
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ mt: 1 }}
              >
                Enter a title, author, or ISBN above
              </Typography>
            </Card>
          )}
        </List>
      </Container>
    </Box>
  );
}