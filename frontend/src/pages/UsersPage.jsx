import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Box,
  Card,
  Avatar,
  Badge,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import api from "../api/axiosClient.js";

const statusColor = (status) => {
  switch (status) {
    case "BORROWED":
      return { bg: "#FEF3F0", text: "#C4320A" };
    case "WAITING":
      return { bg: "#FEF9E7", text: "#974D0C" };
    case "RETURNED":
      return { bg: "#F0FDF4", text: "#16A34A" };
    case "CANCELLED":
    case "REJECTED":
      return { bg: "#FEF2F2", text: "#991B1B" };
    default:
      return { bg: "#F3F4F6", text: "#374151" };
  }
};

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reservations, setReservations] = useState([]);

  const loadUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadReservations = async (user) => {
    try {
      const res = await api.get(`/admin/users/${user.id}/reservations`);
      setReservations(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    loadReservations(user);
  };

  const userStats = selectedUser && {
    total: reservations.length,
    borrowed: reservations.filter((r) => r.status === "BORROWED").length,
    returned: reservations.filter((r) => r.status === "RETURNED").length,
  };

  return (
    <Box sx={{ backgroundColor: "#FAFBFC", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
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
          👥 Users & Reservations
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Manage users and track their library activities
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                maxHeight: 600,
                overflowY: "auto",
                borderRadius: 3,
                border: "1px solid #E5E7EB",
                background: "#fff",
              }}
            >
              <Box sx={{ p: 2, borderBottom: "1px solid #E5E7EB" }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, color: "#1A2332" }}
                >
                  Users ({users.length})
                </Typography>
              </Box>
              <List sx={{ p: 0 }}>
                {users.map((u) => (
                  <ListItemButton
                    key={u.id}
                    selected={selectedUser?.id === u.id}
                    onClick={() => handleSelectUser(u)}
                    sx={{
                      borderBottom: "1px solid #F3F4F6",
                      py: 1.5,
                      transition: "all 0.2s ease",
                      "&.Mui-selected": {
                        backgroundColor: "#F0F9F7",
                        borderLeft: "4px solid #2D5A3D",
                        paddingLeft: "12px",
                      },
                      "&:hover": {
                        backgroundColor: "#FAFBFC",
                      },
                    }}
                  >
                    <Badge
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      variant="dot"
                      sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: u.role === "ADMIN" ? "#2D5A3D" : "#16A34A",
                          color: u.role === "ADMIN" ? "#2D5A3D" : "#16A34A",
                          boxShadow: `0 0 0 2px white`,
                          height: 14,
                          minWidth: 14,
                          borderRadius: "50%",
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          backgroundColor: "#E8B4A8",
                          color: "#fff",
                          mr: 1.5,
                          fontWeight: 700,
                        }}
                      >
                        {u.name?.charAt(0).toUpperCase()}
                      </Avatar>
                    </Badge>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: 600, color: "#1A2332" }}>
                          {u.name}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            color: "#667085",
                            mt: 0.25,
                          }}
                        >
                          {u.email}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            {selectedUser && userStats && (
              <>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {[
                    {
                      label: "Total Reservations",
                      value: userStats.total,
                      color: "#2D5A3D",
                    },
                    {
                      label: "Currently Borrowed",
                      value: userStats.borrowed,
                      color: "#E8B4A8",
                    },
                    {
                      label: "Returned",
                      value: userStats.returned,
                      color: "#16A34A",
                    },
                  ].map((stat, idx) => (
                    <Grid item xs={12} sm={4} key={idx}>
                      <Card
                        elevation={0}
                        sx={{
                          p: 2,
                          background: "#fff",
                          border: "1px solid #E5E7EB",
                          borderRadius: 2,
                          textAlign: "center",
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
                    border: "1px solid #E5E7EB",
                    background: "#fff",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      background: "linear-gradient(135deg, #2D5A3D 0%, #1F3D2C 100%)",
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
                      Reservations for {selectedUser.name}
                    </Typography>
                  </Box>

                  <Box sx={{ overflowX: "auto" }}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
                          <TableCell sx={{ fontWeight: 700 }}>Book</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Issue</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Due</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Return</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Fine</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {reservations.map((r) => {
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
                              <TableCell sx={{ fontWeight: 600 }}>
                                {r.book?.title}
                              </TableCell>
                              <TableCell>{r.issueDate || "—"}</TableCell>
                              <TableCell>{r.dueDate || "—"}</TableCell>
                              <TableCell>{r.returnDate || "—"}</TableCell>
                              <TableCell>
                                <Chip
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
                              <TableCell sx={{ fontWeight: 600 }}>
                                ₹{r.fineAmount ?? 0}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        {reservations.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={6} align="center">
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ py: 3 }}
                              >
                                No reservations yet
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </Box>
                </Paper>
              </>
            )}

            {!selectedUser && (
              <Card
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 3,
                  border: "1px dashed #E5E7EB",
                  background: "#fff",
                }}
              >
                <PersonIcon sx={{ fontSize: 48, color: "#D1D5DB", mb: 2 }} />
                <Typography
                  variant="h6"
                  sx={{ color: "#667085", fontWeight: 600 }}
                >
                  Select a user to view details
                </Typography>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}