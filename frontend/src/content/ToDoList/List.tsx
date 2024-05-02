import { Box, Card, Stack, Typography, useTheme } from "@mui/material";
import React, { useCallback } from "react";
import { useActivities } from "../../hooks/useActivities";
import { AxiosServices } from "../../axios/axiosServices";
import ListItem from "./ListItem";
import ActivityForm from "./ActivityForm";
import If from "../../components/If";
import { useActivity } from "../../context/ActivityContext";
import ListSkeleton from "./ListSkeleton";
import { showToastMessage } from "../../utils/showToastMessage";
import { useToast } from "../../hooks/useToast";

const List = () => {
  const theme = useTheme();
  const {toast, toastSuccess} = useToast();
  const { filter, showForm, setShowForm } = useActivity();
  const { data: activities, mutate, isLoading } = useActivities(filter);

  const handleDeleteActivity = async (id) => {
    try {
      // Make API call to delete activity
      await AxiosServices.Activity.deleteActivity(id);
      // Update the data after deleting activity
      mutate();
    } catch (error) {
      showToastMessage(error, toast, 'Unable to delete item')
    }
  };

  const handleCompleteActivity = async (id) => {
    try {
      await AxiosServices.Activity.updateActivityComplete(id);
      toastSuccess('Activity complete!')
      mutate();
    } catch (error) {
      showToastMessage(error, toast, 'Unable to update item to Complete')
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
