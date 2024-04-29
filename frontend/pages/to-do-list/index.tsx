import React, { useCallback, useState } from "react";
import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import { useActivities } from "../../src/hooks/useActivities";
import { Status } from "../../generated/api/models/Status";
import { AxiosServices } from "../../src/axios/axiosServices";

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

  const handleAddActivity = async () => {
    try {
      // Make API call to add activity
      await AxiosServices.Activity.addActivity({
        title: title,
        description: description,
      });

      // Reset the form fields
      setTitle("");
      setDescription("");

      // Update the data after adding activity
      mutate();
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  return (
    <>
      <Typography variant="body1">To Do List</Typography>
      <Stack direction={"row"} gap={3} flexWrap={"wrap"}>
        {activities?.map((activity, id) => (
          <Card
            key={id}
            sx={{
              width: "200px",
              height: "150px",
              p: 2,
              alignItems: "center",
            }}
          >
            <Typography variant="h5">{activity.title}</Typography>
            <Typography variant="body1">{activity.description}</Typography>
            <Typography variant="body1">
              {getStatusLabel(activity.status)}
            </Typography>
            {activity.status !== Status.Complete && (
              <Button
                variant="contained"
                onClick={() => handleCompleteActivity(activity.id)}
              >
                Complete
              </Button>
            )}
          </Card>
        ))}
      </Stack>
      <Stack direction={"column"} gap={2}>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddActivity}>
          Add Activity
        </Button>
      </Stack>
    </>
  );
};

export default ToDoList;
