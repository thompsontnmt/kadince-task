import React, { useCallback, useState } from "react";
import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import { useActivities } from "../../src/hooks/useActivities";
import { Status } from "../../generated/api/models/Status";
import { AxiosServices } from "../../src/axios/axiosServices";
import List from "../../src/content/ToDoList/List";
import { MainBox } from "../../src/components/GlobalComponents";
import Header from "../../src/content/ToDoList/Header";

const ToDoList = () => {
  const { data: activities, mutate } = useActivities();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const getStatusLabel = (status) => {
    return Status[status] || "Unknown";
  };
  const handleCompleteActivity = useCallback(
    async (id) => {
      try {
        // Make API call to mark activity as complete
        await AxiosServices.Activity.updateActivityComplete(id);

        // Update the data after completion
        mutate();
      } catch (error) {
        console.error("Error completing activity:", error);
      }
    },
    [mutate]
  );

  return (
    <MainBox>
      <Header />
      <List />
    </MainBox>
  );
};

export default ToDoList;
