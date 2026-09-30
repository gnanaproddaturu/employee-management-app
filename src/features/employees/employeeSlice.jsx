import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { employeeService } from "../../services/employeeService";
import { getErrorMessage } from "../../utils/getErrorMessage";



export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      return await employeeService.getAll();
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(
          error,
          "Unable to load employees."
        )
      );
    }
  }
);



export const searchEmployeeByName = createAsyncThunk(
  "employees/searchEmployeeByName",
  async (name, { rejectWithValue }) => {
    try {
      const employees =
        await employeeService.getAll();

      const searchValue = name
        .trim()
        .toLowerCase();

      const results = employees.filter(
        (employee) =>
          String(employee.name || "")
            .toLowerCase()
            .includes(searchValue)
      );

      if (results.length === 0) {
        return rejectWithValue(
          `No employee found with name "${name}".`
        );
      }

      return results;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(
          error,
          "Unable to search employees."
        )
      );
    }
  }
);



export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (employee, { rejectWithValue }) => {
    try {
      return await employeeService.create(
        employee
      );
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(
          error,
          "Unable to create employee."
        )
      );
    }
  }
);




export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (
    { id, employee },
    { rejectWithValue }
  ) => {
    try {
      return await employeeService.update(
        id,
        employee
      );
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(
          error,
          "Unable to update employee."
        )
      );
    }
  }
);


export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      await employeeService.delete(id);

      return id;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(
          error,
          "Unable to delete employee."
        )
      );
    }
  }
);



const initialState = {
  items: [],

  searchResults: [],

  loading: false,

  searchLoading: false,

  mutationLoading: false,

  error: null,

  searchError: null,
};


const employeeSlice = createSlice({
  name: "employees",

  initialState,

  reducers: {
    clearSearch: (state) => {
      state.searchResults = [];
      state.searchError = null;
    },
  },

  extraReducers: (builder) => {


    builder
      .addCase(
        fetchEmployees.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchEmployees.fulfilled,
        (state, action) => {
          state.loading = false;

          state.items = Array.isArray(
            action.payload
          )
            ? action.payload
            : [];

          state.error = null;
        }
      )

      .addCase(
        fetchEmployees.rejected,
        (state, action) => {
          state.loading = false;

          state.items = [];

          state.error =
            action.payload ||
            "Unable to load employees.";
        }
      );


    builder
      .addCase(
        searchEmployeeByName.pending,
        (state) => {
          state.searchLoading = true;

          state.searchResults = [];

          state.searchError = null;
        }
      )

      .addCase(
        searchEmployeeByName.fulfilled,
        (state, action) => {
          state.searchLoading = false;

          state.searchResults =
            action.payload;

          state.searchError = null;
        }
      )

      .addCase(
        searchEmployeeByName.rejected,
        (state, action) => {
          state.searchLoading = false;

          state.searchResults = [];

          state.searchError =
            action.payload ||
            "No employee found.";
        }
      );

    builder
      .addCase(
        createEmployee.pending,
        (state) => {
          state.mutationLoading = true;
          state.error = null;
        }
      )

      .addCase(
        createEmployee.fulfilled,
        (state, action) => {
          state.mutationLoading = false;

          state.items.push(
            action.payload
          );

          state.error = null;
        }
      )

      .addCase(
        createEmployee.rejected,
        (state, action) => {
          state.mutationLoading = false;

          state.error =
            action.payload ||
            "Unable to create employee.";
        }
      );


    builder
      .addCase(
        updateEmployee.pending,
        (state) => {
          state.mutationLoading = true;
          state.error = null;
        }
      )

      .addCase(
        updateEmployee.fulfilled,
        (state, action) => {
          state.mutationLoading = false;

          const updatedEmployee =
            action.payload;

          const index =
            state.items.findIndex(
              (employee) =>
                String(employee.id) ===
                String(updatedEmployee.id)
            );

          if (index !== -1) {
            state.items[index] =
              updatedEmployee;
          }

          state.searchResults =
            state.searchResults.map(
              (employee) =>
                String(employee.id) ===
                String(updatedEmployee.id)
                  ? updatedEmployee
                  : employee
            );

          state.error = null;
        }
      )

      .addCase(
        updateEmployee.rejected,
        (state, action) => {
          state.mutationLoading = false;

          state.error =
            action.payload ||
            "Unable to update employee.";
        }
      );


    builder
      .addCase(
        deleteEmployee.pending,
        (state) => {
          state.mutationLoading = true;
          state.error = null;
        }
      )

      .addCase(
        deleteEmployee.fulfilled,
        (state, action) => {
          state.mutationLoading = false;

          state.items =
            state.items.filter(
              (employee) =>
                String(employee.id) !==
                String(action.payload)
            );

          state.searchResults =
            state.searchResults.filter(
              (employee) =>
                String(employee.id) !==
                String(action.payload)
            );

          state.error = null;
        }
      )

      .addCase(
        deleteEmployee.rejected,
        (state, action) => {
          state.mutationLoading = false;

          state.error =
            action.payload ||
            "Unable to delete employee.";
        }
      );
  },
});




export const {
  clearSearch,
} = employeeSlice.actions;


export default employeeSlice.reducer;