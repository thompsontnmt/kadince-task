import React from "react";
import { Stack, Button, Typography, MenuItem, Select } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useActivity } from "../../context/ActivityContext";

const Header = () => {
  const { setShowForm, setFilter, filter } = useActivity();

  const handleFilterChange = (event) => {
    const value = event.target.value;
    const filterValue = value === "" ? null : value === "true";

    setFilter(filterValue);
  };

  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
      <Button
        variant="contained"
        onClick={() => setShowForm(true)}
        color="info"
        startIcon={<AddIcon />}
      >
        <Typography variant="h6">Add Activity</Typography>
      </Button>
      <Select
        value={filter === null ? "" : filter.toString()}
        onChange={handleFilterChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        variant="outlined"
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="">
          All
        </MenuItem>
        <MenuItem value="true">Completed</MenuItem>
        <MenuItem value="false">Pending</MenuItem>
      </Select>
    </Stack>
  );
};

export default Header;
