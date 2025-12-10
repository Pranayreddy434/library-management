import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0F172A" },
    secondary: { main: "#06B6D4" },
    background: {
      default: "#0F172A",
      paper: "#1E293B",
    },
    text: {
      primary: "#1F2937",
      secondary: "#6B7280",
    },
    success: { main: "#10B981" },
    warning: { main: "#F59E0B" },
    error: { main: "#EF4444" },
    info: { main: "#06B6D4" },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: "-0.5px",
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.1)",
            transition: "left 0.3s ease",
            zIndex: 0,
          },
          "&:hover::before": {
            left: "100%",
          },
        },
        contained: {
          boxShadow: "0 10px 30px rgba(6, 182, 212, 0.3)",
          border: "1px solid rgba(6, 182, 212, 0.2)",
          background: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)",
          "&:hover": {
            boxShadow: "0 20px 50px rgba(6, 182, 212, 0.5)",
            transform: "translateY(-4px)",
            border: "1px solid rgba(6, 182, 212, 0.5)",
          },
          "&:active": {
            transform: "translateY(-2px)",
          },
        },
        outlined: {
          borderColor: "#334155",
          color: "#06B6D4",
          "&:hover": {
            borderColor: "#06B6D4",
            backgroundColor: "rgba(6, 182, 212, 0.1)",
            boxShadow: "0 8px 20px rgba(6, 182, 212, 0.2)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #334155",
          background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            borderColor: "#06B6D4",
            boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.25)",
            transform: "translateY(-8px)",
            backdropFilter: "blur(10px)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid #334155",
          backgroundImage: "none",
          background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            transition: "all 0.3s ease",
           // backgroundColor: "rgba(30, 41, 59, 0.5)",
            border: "1px solid #334155",
            "&:hover fieldset": {
              borderColor: "#06B6D4",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#06B6D4",
              boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
            },
          },
          "& .MuiOutlinedInput-input": {
            color: "#101010ff",
          },
          "& .MuiOutlinedInput-input::placeholder": {
            color: "rgba(14, 13, 14, 0.33)",
            opacity: 1,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(6, 182, 212, 0.2)",
          boxShadow: "0 8px 32px rgba(6, 182, 212, 0.1)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: "0.75rem",
          border: "1px solid rgba(6, 182, 212, 0.3)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "linear-gradient(180deg, #0F172A 0%, #1E293B 100%)",
          border: "1px solid rgba(6, 182, 212, 0.2)",
          backdropFilter: "blur(10px)",
        },
      },
    },
  },
});

export default theme;