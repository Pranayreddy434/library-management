import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Box,
  Card,
} from "@mui/material";
import { useSnackbar } from "notistack";
import api from "../api/axiosClient.js";

const statusColor = (status) => {
  switch (status) {
    case "BORROWED":
      return { bg: "#FEF3F0", text: "#C4320A", label: "Borrowed" };
    case "WAITING":
      return { bg: "#FEF9E7", text: "#974D0C", label: "Waiting List" };
    case "RETURNED":
      return { bg: "#F0FDF4", text: "#16A34A", label: "Returned" };
    case "CANCELLED":
    case "REJECTED":
      return { bg: "#FEF2F2", text: "#991B1B", label: status };
    default:
      return { bg: "#F3F4F6", text: "#374151", label: status };
  }
};

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/reservations/my");
      setReservations(res.data || []);
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to load reservations", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const statsData = [
    {
      label: "Total Reservations",
      value: reservations.length,
      color: "#2D5A3D",
    },
    {
      label: "Currently Borrowed",
      value: reservations.filter((r) => r.status === "BORROWED").length,
      color: "#E8B4A8",
    },
    {
      label: "Waiting List",
      value: reservations.filter((r) => r.status === "WAITING").length,
      color: "#F59E0B",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#FAFBFC", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: "#1A2332",
          }}
        >
          📋 My Reservations
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Track and manage your book reservations
        </Typography>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          {statsData.map((stat, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card
                elevation={0}
                sx={{
                  p: 2,
                  background: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: stat.color,
                    mt: 1,
                  }}
                >
                  {stat.value}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            border: "1px solid #E5E7EB",
          }}
        >
          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    background: "linear-gradient(135deg, #044b54 0%, #0b6b9a 100%)",
                  }}
                >
                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    Book
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    Issue Date
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    Due Date
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    Returned
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    Fine (₹)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservations.map((r, idx) => {
                  const colors = statusColor(r.status);
                  return (
                    <TableRow
                      key={r.id}
                      sx={{
                        backgroundColor: idx % 2 === 0 ? "#fff" : "#F9FAFB",
                        "&:hover": {
                          backgroundColor: "#F3F4F6",
                        },
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      <TableCell sx={{ fontWeight: 600 }}>
                        {r.bookTitle || "Book"}
                        {r.bookAuthor && (
                          <Typography
                            variant="caption"
                            display="block"
                            color="black"
                          >
                            {r.bookAuthor}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>{r.issueDate || "—"}</TableCell>
                      <TableCell>{r.dueDate || "—"}</TableCell>
                      <TableCell>{r.returnDate || "—"}</TableCell>
                      <TableCell>
                        <Chip
                          label={colors.label}
                          size="small"
                          sx={{
                            backgroundColor: colors.bg,
                            color: colors.text,
                            fontWeight: 600,
                            border: "none",
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#E8B4A8" }}>
                        ₹{r.fineAmount ?? 0}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {reservations.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Box sx={{ py: 4 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#667085",
                            fontWeight: 600,
                            mb: 1,
                          }}
                        >
                          📚 No Reservations Yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Go to the Books page and reserve a book to get started
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

import { Grid } from "@mui/material";