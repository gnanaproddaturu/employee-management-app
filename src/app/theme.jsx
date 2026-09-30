

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb",
    },

    secondary: {
      main: "#7c3aed",
    },

    background: {
      default: "#f5f7fb",
      paper: "#ffffff",
    },

    text: {
      primary: "#172033",
      secondary: "#667085",
    },
  },

  typography: {
    fontFamily: "Inter, Arial, sans-serif",

    h4: {
      fontWeight: 800,
    },

    h5: {
      fontWeight: 800,
    },

    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },

  shape: {
    borderRadius: 14,
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 10px 35px rgba(16, 24, 40, 0.06)",
        },
      },
    },
  },
});