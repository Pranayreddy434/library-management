import { useEffect, useState } from "react";
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
  Button,
  Box,
  Card,
  Grid,
  TablePagination,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSnackbar } from "notistack";
import api from "../api/axiosClient.js";

const statusColor = (status) => {
  switch (status) {
    case "BORROWED":
      return { bg: "#FEF3F0", text: "#C4320A", icon: "📖" };
    case "WAITING":
      return { bg: "#FEF9E7", text: "#974D0C", icon: "⏳" };
    case "RETURNED":
      return { bg: "#F0FDF4", text: "#16A34A", icon: "✅" };
    case "CANCELLED":
    case "REJECTED":
      return { bg: "#FEF2F2", text: "#991B1B", icon: "❌" };
    default:
      return { bg: "#F3F4F6", text: "#374151", icon: "📋" };
  }
};

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { enqueueSnackbar } = useSnackbar();

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/reservations");
      setReservations(res.data || []);
    } catch (err) {
      enqueueSnackbar("Failed to load reservations", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const markReturned = async (id) => {
    try {
      await api.put(`/admin/reservations/${id}/return`);
      enqueueSnackbar("Marked as returned", { variant: "success" });
      load();
    } catch (err) {
      enqueueSnackbar("Failed to mark as returned", { variant: "error" });
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const stats = [
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
    {
      label: "Returned",
      value: reservations.filter((r) => r.status === "RETURNED").length,
      color: "#16A34A",
    },
  ];

  const paginatedReservations = reservations.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
            📊 Reservations Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Monitor all library reservations and manage returns
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          {stats.map((stat, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
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
            background: "#fff",
          }}
        >
          <Box
            sx={{
              p: 2,
               background: "linear-gradient(135deg, #044b54 0%, #0b6b9a 100%)",
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#fff",
              }}
            >
              All Reservations
            </Typography>
          </Box>

          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
                  <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Book</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>User</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Issue</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Due</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Return</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Fine</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                        Loading...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : paginatedReservations.length > 0 ? (
                  paginatedReservations.map((r) => {
                    const colors = statusColor(r.status);
                    return (
                      <TableRow
                        key={r.id}
                        sx={{
                          backgroundColor: "#fff",
                          "&:hover": {
                            backgroundColor: "#F9FAFB",
                          },
                          borderBottom: "1px solid #E5E7EB",
                        }}
                      >
                        <TableCell sx={{ fontWeight: 600, fontSize: "0.85rem" }}>
                          #{r.id}
                        </TableCell>
                        <TableCell>
                          <Typography sx={{ fontWeight: 600 }}>
                            {r.book?.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            display="block"
                            color="text.secondary"
                          >
                            {r.book?.author}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography sx={{ fontWeight: 600 }}>
                            {r.user?.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            display="block"
                            color="text.secondary"
                          >
                            {r.user?.email}
                          </Typography>
                        </TableCell>
                        <TableCell>{r.issueDate || "—"}</TableCell>
                        <TableCell>{r.dueDate || "—"}</TableCell>
                        <TableCell>{r.returnDate || "—"}</TableCell>
                        <TableCell>
                          <Chip
                            icon={
                              <span
                                style={{
                                  fontSize: "1.2rem",
                                  marginRight: "4px",
                                }}
                              >
                                {colors.icon}
                              </span>
                            }
                            label={r.status}
                            size="small"
                            sx={{
                              backgroundColor: colors.bg,
                              color: colors.text,
                              fontWeight: 600,
                              border: "none",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: r.fineAmount > 0 ? "#DC2626" : "#667085",
                            }}
                          >
                            ₹{r.fineAmount ?? 0}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {r.status === "BORROWED" && (
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<CheckCircleIcon />}
                              onClick={() => markReturned(r.id)}
                              sx={{
                                background:
                                  "linear-gradient(135deg, #16A34A 0%, #15803D 100%)",
                                fontWeight: 600,
                                textTransform: "none",
                              }}
                            >
                              Return
                            </Button>
                          )}
                          {r.status !== "BORROWED" && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              —
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                        No reservations found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>

          {reservations.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={reservations.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                backgroundColor: "#F9FAFB",
                borderTop: "1px solid #E5E7EB",
                "& .MuiTablePagination-select": {
                  fontWeight: 600,
                },
              }}
            />
          )}
        </Paper>
      </Container>
    </Box>
  );
}