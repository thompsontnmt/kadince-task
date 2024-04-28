import React from "react";
import { Typography } from "@mui/material";
import { useActivities } from "../../src/hooks/useActivities";

const ToDoList = () => {
  const { data: activities } = useActivities();
  return (
    <>
      <Typography variant="body1">To Do List</Typography>
      <p>{JSON.stringify(activities)}</p>
    </>
  );
};

export default ToDoList;
