import React from "react";
import { Stack, Button, Typography, MenuItem, Select, Tooltip, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useActivity } from "../../context/ActivityContext";
import SwapVertTwoToneIcon from '@mui/icons-material/SwapVertTwoTone';
import { useActivities } from "../../hooks/useActivities";


const Header = () => {
  const { setShowForm, setFilter, filter, sortOrder, setSortOrder } = useActivity();
  const {activities} = useActivities(filter, sortOrder)

  const handleFilterChange = (event) => {
    const value = event.target.value;
    const filterValue = value === "" ? null : value === "true";

    setFilter(filterValue);
  };
  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'desc' ? 'asc' : 'desc');
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
      <Stack direction={'row'} alignItems={'center'} gap={1}>
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
        <Tooltip
                title={
                  "Sort by creation time"
                }
                placement="top"
              >
                <span>
                  <IconButton
                    color="info"
                    onClick={toggleSortOrder}
                    disabled={activities?.length === 0}
                  >
                    <SwapVertTwoToneIcon fontSize="large" />
                  </IconButton>
                </span>
              </Tooltip>
      </Stack>
    </Stack>
  );
};

export default Header;
