


import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { useDispatch, useSelector } from "react-redux";

import EmployeeTable from "../components/EmployeeTable";
import EmployeeFormDialog from "../components/EmployeeFormDialog";
import DeleteEmployeeDialog from "../components/DeleteEmployeeDialog";

import {
  createEmployee,
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
} from "../employeeSlice";


export default function EmployeePage({
  showToast = () => {},
}) {
  const dispatch = useDispatch();

  const {
    items = [],
    loading,
    mutationLoading,
    error,
  } = useSelector(
    (state) => state.employees
  );

  const countries = useSelector(
    (state) =>
      state.countries?.items || []
  );

  const [search, setSearch] =
    useState("");

  const [formOpen, setFormOpen] =
    useState(false);

  const [editingEmployee, setEditingEmployee] =
    useState(null);

  const [deletingEmployee, setDeletingEmployee] =
    useState(null);


  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);


 const filteredEmployees = useMemo(() => {
  const searchValue = search.trim().toLowerCase();

  if (!searchValue) {
    return [...items].sort((a, b) =>
      String(a.name || "").localeCompare(
        String(b.name || "")
      )
    );
  }

  return items
    .filter((employee) => {
      const employeeName = String(
        employee.name || ""
      ).toLowerCase();

      const employeeId = String(
        employee.id || ""
      ).toLowerCase();

      return (
        employeeName.includes(searchValue) ||
        employeeId.includes(searchValue)
      );
    })
    .sort((a, b) =>
      String(a.name || "").localeCompare(
        String(b.name || "")
      )
    );
}, [items, search]);



  const openCreate = () => {
    setEditingEmployee(null);
    setFormOpen(true);
  };



  const openEdit = (employee) => {
    setEditingEmployee(employee);
    setFormOpen(true);
  };



  const handleSubmit = async (form) => {
    try {
      if (editingEmployee) {
        await dispatch(
          updateEmployee({
            id: editingEmployee.id,
            employee: form,
          })
        ).unwrap();

        showToast(
          "Employee updated successfully."
        );
      } else {
        await dispatch(
          createEmployee(form)
        ).unwrap();

        showToast(
          "Employee created successfully."
        );
      }

      setFormOpen(false);
      setEditingEmployee(null);

    } catch (error) {
      showToast(
        error?.message ||
          "Unable to save employee.",
        "error"
      );
    }
  };



  const handleDelete = async () => {
    if (!deletingEmployee?.id) {
      return;
    }

    try {
      await dispatch(
        deleteEmployee(
          deletingEmployee.id
        )
      ).unwrap();

      showToast(
        "Employee deleted successfully."
      );

      setDeletingEmployee(null);

    } catch (error) {
      showToast(
        error?.message ||
          "Unable to delete employee.",
        "error"
      );
    }
  };


  return (
    <Stack spacing={3}>


      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        justifyContent="space-between"
        alignItems={{
          xs: "stretch",
          md: "center",
        }}
        spacing={2}
      >

        <div>
          <Typography
            variant="h4"
            fontWeight={800}
          >
            Employees
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Manage employee records from
            one place.
          </Typography>
        </div>

        <Button
          variant="contained"
          startIcon={
            <AddRoundedIcon />
          }
          onClick={openCreate}
        >
          Add Employee
        </Button>

      </Stack>


      <Card>
        <CardContent>

          <Stack spacing={2}>

            <div>
              <Typography
                variant="h6"
                fontWeight={800}
              >
                Search Employees
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Search employees by name.
              </Typography>
            </div>


            <TextField
              fullWidth
              size="small"
              label="Search employee"
              placeholder="Enter employee name..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              slotProps={{
                input: {
                  startAdornment: (
                    <SearchRoundedIcon
                      sx={{
                        mr: 1,
                        color:
                          "text.secondary",
                      }}
                    />
                  ),
                },
              }}
            />

          </Stack>

        </CardContent>
      </Card>



      <Card>
        <CardContent>

          <Stack spacing={2}>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >

              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
              >

                <PeopleAltRoundedIcon
                  color="primary"
                />

                <div>

                  <Typography
                    variant="h6"
                    fontWeight={800}
                  >
                    Employee List
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Showing{" "}
                    {filteredEmployees.length}{" "}
                    of{" "}
                    {items.length} employees
                  </Typography>

                </div>

              </Stack>

            </Stack>


            <Divider />


            {loading && (
              <Stack
                alignItems="center"
                spacing={1.5}
                sx={{ py: 6 }}
              >

                <CircularProgress />

                <Typography color="text.secondary">
                  Loading employees...
                </Typography>

              </Stack>
            )}


            {!loading && error && (
              <Alert severity="error">
                {error}
              </Alert>
            )}

            {!loading &&
              !error &&
              items.length === 0 && (
                <Alert severity="info">
                  No employees available.
                </Alert>
              )}


            {!loading &&
              !error &&
              items.length > 0 &&
              filteredEmployees.length === 0 && (
                <Alert severity="warning">
                  No employee found with name "
                  {search}
                  ".
                </Alert>
              )}


            {!loading &&
              !error &&
              filteredEmployees.length > 0 && (
                <EmployeeTable
                  employees={
                    filteredEmployees
                  }
                  onEdit={openEdit}
                  onDelete={
                    setDeletingEmployee
                  }
                />
              )}

          </Stack>

        </CardContent>
      </Card>

      <EmployeeFormDialog
        open={formOpen}
        employee={editingEmployee}
        countries={countries}
        loading={mutationLoading}
        onClose={() => {
          setFormOpen(false);
          setEditingEmployee(null);
        }}
        onSubmit={handleSubmit}
      />


      <DeleteEmployeeDialog
        open={
          Boolean(deletingEmployee)
        }
        employee={deletingEmployee}
        loading={mutationLoading}
        onClose={() =>
          setDeletingEmployee(null)
        }
        onConfirm={handleDelete}
      />

    </Stack>
  );
}