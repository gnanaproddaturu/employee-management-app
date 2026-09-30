



import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

import { useEmployeeForm } from "../hooks/useEmployeeForm";

export default function EmployeeFormDialog({
  open,
  employee,
  countries,
  loading,
  onClose,
  onSubmit,
}) {
  const {
    form,
    errors,
    handleChange,
    validate,
  } = useEmployeeForm(employee);

  const submit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit(form);
  };

  return (
    <Dialog
      open={open}
      onClose={
        loading
          ? undefined
          : onClose
      }
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {employee
          ? "Edit employee"
          : "Add employee"}
      </DialogTitle>

      <form onSubmit={submit}>
        <DialogContent dividers>
          <Grid
            container
            spacing={2}
          >
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={form.name}
                onChange={
                  handleChange
                }
                error={Boolean(
                  errors.name
                )}
                helperText={
                  errors.name
                }
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={form.email}
                onChange={
                  handleChange
                }
                error={Boolean(
                  errors.email
                )}
                helperText={
                  errors.email
                }
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <TextField
                fullWidth
                label="Mobile"
                name="mobile"
                value={form.mobile}
                onChange={
                  handleChange
                }
                inputProps={{
                  maxLength: 10,
                  inputMode:
                    "numeric",
                }}
                error={Boolean(
                  errors.mobile
                )}
                helperText={
                  errors.mobile
                }
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                select
                fullWidth
                label="Country"
                name="country"
                value={form.country}
                onChange={
                  handleChange
                }
                error={Boolean(
                  errors.country
                )}
                helperText={
                  errors.country
                }
              >
                {countries.map(
                  (country) => (
                    <MenuItem
                      key={
                        country.id
                      }
                      value={
                        country.name ||
                        country.country
                      }
                    >
                      {country.name ||
                        country.country}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>

            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <TextField
                fullWidth
                label="State"
                name="state"
                value={form.state}
                onChange={
                  handleChange
                }
                error={Boolean(
                  errors.state
                )}
                helperText={
                  errors.state
                }
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <TextField
                fullWidth
                label="District"
                name="district"
                value={
                  form.district
                }
                onChange={
                  handleChange
                }
                error={Boolean(
                  errors.district
                )}
                helperText={
                  errors.district
                }
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : employee
              ? "Update employee"
              : "Add employee"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}