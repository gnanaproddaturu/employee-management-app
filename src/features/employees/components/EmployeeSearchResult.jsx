import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

export default function EmployeeSearchResult({
  employee,
  loading,
  error,
}) {
  if (loading) {
    return (
      <Stack
        alignItems="center"
        spacing={1}
        sx={{ py: 3 }}
      >
        <CircularProgress size={28} />

        <Typography color="text.secondary">
          Searching employee...
        </Typography>
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        {error}
      </Alert>
    );
  }

  if (!employee) {
    return null;
  }

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: "background.default",
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Typography
            variant="subtitle1"
            fontWeight={800}
          >
            Employee Found
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Name
              </Typography>

              <Typography fontWeight={600}>
                {employee.name || "-"}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Email
              </Typography>

              <Typography fontWeight={600}>
                {employee.email || "-"}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Mobile
              </Typography>

              <Typography fontWeight={600}>
                {employee.mobile || "-"}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Country
              </Typography>

              <Typography fontWeight={600}>
                {employee.country || "-"}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                State
              </Typography>

              <Typography fontWeight={600}>
                {employee.state || "-"}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                District
              </Typography>

              <Typography fontWeight={600}>
                {employee.district || "-"}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}