

import {
  Avatar,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

export default function EmployeeTable({
  employees,
  onEdit,
  onDelete,
}) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        border:
          "1px solid #eaecf0",
        overflowX: "auto",
      }}
    >
      <Table
        sx={{
          minWidth: 760,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              Name
            </TableCell>

            <TableCell>
              Email
            </TableCell>

            <TableCell>
              Mobile
            </TableCell>

            <TableCell>
              Country
            </TableCell>

            <TableCell align="right">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {employees.map(
            (employee) => (
              <TableRow
                key={employee.id}
                hover
              >
                <TableCell>
                  <div className="employee-name-cell">
                    <Avatar>
                      {employee.name
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </Avatar>

                    <div>
                      <Typography fontWeight={700}>
                        {employee.name}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        ID: {employee.id}
                      </Typography>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  {employee.email ||
                    "—"}
                </TableCell>

                <TableCell>
                  {employee.mobile ||
                    "—"}
                </TableCell>

                <TableCell>
                  <Chip
                    label={
                      employee.country ||
                      "Unknown"
                    }
                    size="small"
                    variant="outlined"
                  />
                </TableCell>

                <TableCell align="right">
                  <Tooltip title="Edit employee">
                    <IconButton
                      color="primary"
                      onClick={() =>
                        onEdit(
                          employee
                        )
                      }
                    >
                      <EditRoundedIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete employee">
                    <IconButton
                      color="error"
                      onClick={() =>
                        onDelete(
                          employee
                        )
                      }
                    >
                      <DeleteRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}