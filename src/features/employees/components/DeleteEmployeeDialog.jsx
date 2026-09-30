

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

export default function DeleteEmployeeDialog({
  open,
  employee,
  loading,
  onClose,
  onConfirm,
}) {
  return (
    <Dialog
      open={open}
      onClose={
        loading
          ? undefined
          : onClose
      }
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Delete employee?
      </DialogTitle>

      <DialogContent>
        <Typography color="text.secondary">
          Are you sure you want to
          delete{" "}
          <strong>
            {employee?.name}
          </strong>
          ? This action cannot be
          undone.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading
            ? "Deleting..."
            : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}