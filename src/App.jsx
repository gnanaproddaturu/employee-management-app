
import { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Container,
  Snackbar,
} from "@mui/material";

import { useDispatch } from "react-redux";

import DashboardHeader from "./components/layout/DashboardHeader";



import { fetchCountries } from "./features/countries/countrySlice";
import EmployeePage from "./features/employees/pages/EmployeePage";

export default function App() {
  const dispatch = useDispatch();

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const showToast = (
    message,
    severity = "success"
  ) => {
    setToast({
      open: true,
      message,
      severity,
    });
  };

  return (
    <Box
      minHeight="100vh"
      className="app-shell"
    >
      <DashboardHeader />

      <Container
        maxWidth="xl"
        sx={{
          py: {
            xs: 2,
            md: 4,
          },
        }}
      >
        <EmployeePage
          showToast={showToast}
        />
      </Container>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() =>
          setToast((previous) => ({
            ...previous,
            open: false,
          }))
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity={toast.severity}
          variant="filled"
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}