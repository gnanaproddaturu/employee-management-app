

import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { countryService } from "../../services/countryService";

import {
  getErrorMessage,
} from "../../utils/getErrorMessage";

export const fetchCountries =
  createAsyncThunk(
    "countries/fetchCountries",

    async (_, { rejectWithValue }) => {
      try {
        return await countryService.getAll();
      } catch (error) {
        return rejectWithValue(
          getErrorMessage(
            error,
            "Unable to load countries."
          )
        );
      }
    }
  );

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const countrySlice =
  createSlice({
    name: "countries",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
      builder

        .addCase(
          fetchCountries.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          }
        )

        .addCase(
          fetchCountries.fulfilled,
          (state, action) => {
            state.loading = false;
            state.items = action.payload;
          }
        )

        .addCase(
          fetchCountries.rejected,
          (state, action) => {
            state.loading = false;
            state.error = action.payload;
          }
        );
    },
  });

export default countrySlice.reducer;