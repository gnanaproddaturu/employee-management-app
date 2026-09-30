

import { useState } from "react";

import {
  Button,
  Stack,
  TextField,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

export default function EmployeeSearch({
  loading,
  onSearch,
  onClear,
}) {
  const [searchName, setSearchName] =
    useState("");

  const handleSearch = () => {
    const name = searchName.trim();

    if (!name) {
      return;
    }

    onSearch(name);
  };

  const handleClear = () => {
    setSearchName("");
    onClear();
  };

  return (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing={2}
    >
      <TextField
        fullWidth
        size="small"
        label="Employee Name"
        placeholder="Enter employee name"
        value={searchName}
        onChange={(event) =>
          setSearchName(event.target.value)
        }
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSearch();
          }
        }}
      />

      <Button
        variant="contained"
        startIcon={<SearchRoundedIcon />}
        onClick={handleSearch}
        disabled={
          loading ||
          !searchName.trim()
        }
        sx={{
          minWidth: 120,
        }}
      >
        {loading
          ? "Searching..."
          : "Search"}
      </Button>

      <Button
        variant="outlined"
        startIcon={<ClearRoundedIcon />}
        onClick={handleClear}
        disabled={
          !searchName.trim() &&
          !loading
        }
        sx={{
          minWidth: 100,
        }}
      >
        Clear
      </Button>
    </Stack>
  );
}