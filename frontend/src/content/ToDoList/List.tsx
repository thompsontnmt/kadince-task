import { Box, Card, Stack, Typography, useTheme } from "@mui/material";
import React, { useCallback } from "react";
import { useActivities } from "../../hooks/useActivities";
import { AxiosServices } from "../../axios/axiosServices";
import ListItem from "./ListItem";
import ActivityForm from "./ActivityForm";
import If from "../../components/If";
import { useActivity } from "../../context/ActivityContext";
import ListSkeleton from "./ListSkeleton";

const List = () => {
  const theme = useTheme();
  const { filter, showForm, setShowForm } = useActivity();
  console.log(filter);
  const { data: activities, mutate, isLoading } = useActivities(filter);

  const handleDeleteActivity = async (id) => {
    try {
      // Make API call to delete activity
      await AxiosServices.Activity.deleteActivity(id);
      // Update the data after deleting activity
      mutate();
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  const handleCompleteActivity = async (id) => {
    try {
      await AxiosServices.Activity.updateActivityComplete(id);
      mutate();
    } catch (error) {
      console.error("Error completing activity:", error);
    }
  };

  const handleUpdateActivity = async (id, body) => {
    try {
      await AxiosServices.Activity.updateActivity(id, body);
      mutate();
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };

  const sortedActivities = activities
    ? activities.sort((a, b) => {
        return (
          new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime()
        );
      })
    : [];

  return (
    <Card
      sx={{
        p: 4,
        alignContent: "center",
        backgroundColor: theme.palette.background.paper,
        maxHeight: "800px",
        overflowY: "auto",
      }}
    >
      <Stack gap={2}>
        <If
          condition={!!showForm}
          then={
            <Box pb={2}>
              <ActivityForm handleClose={() => setShowForm(false)} />
            </Box>
          }
        />
        <If
          condition={isLoading}
          then={<ListSkeleton />}
          else={
            <>
              {sortedActivities.map((activity) => (
                <ListItem
                  key={activity.id}
                  activity={activity}
                  onDelete={handleDeleteActivity}
                  onComplete={handleCompleteActivity}
                  onUpdate={handleUpdateActivity}
                />
              ))}
            </>
          }
        />
      </Stack>
    </Card>
  );
};

export default List;
