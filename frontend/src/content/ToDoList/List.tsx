import { Box, Card, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
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
  const { toast, toastSuccess } = useToast();
  const { filter, showForm, setShowForm, sortOrder } = useActivity();
  const {
    activities,
    updateActivityInCache,
    removeActivityFromCache,
    isLoading,
  } = useActivities(filter, sortOrder);

  const handleDeleteActivity = async (id) => {
    try {
      await AxiosServices.Activity.deleteActivity(id);
      removeActivityFromCache(id); // Optimistically update the data after deleting activity
    } catch (error) {
      showToastMessage(error, toast, "Unable to delete item");
    }
  };

  const handleCompleteActivity = async (id) => {
    try {
      const response = await AxiosServices.Activity.updateActivityComplete(id);
      // Update the specific activity in the cache
      const activityData = response.data;
      updateActivityInCache(activityData);
      toastSuccess("Activity completed!");
    } catch (error) {
      showToastMessage(error, toast, "Unable to update item to Complete");
    }
  };

  const handleUncompleteActivity = async (id) => {
    try {
      const response = await AxiosServices.Activity.updateActivityUncomplete(id);
      const activityData = response.data;
      updateActivityInCache(activityData);
    } catch (error) {
      showToastMessage(error, toast, "Unable to update item to Uncomplete");
    }
  };

  return (
    <Card
      sx={{
        p: 4,
        alignContent: "center",
        backgroundColor: theme.palette.background.paper,
        maxHeight: {
          lg: '650px',
          xl: '800px'
        },
        overflowY: "auto",
      }}
    >
      <If
        condition={activities?.length === 0 && !showForm}
        then={
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h6">
              {!!filter
                ? "No activities completed"
                : filter !== null && filter !== undefined
                ? "No activities pending"
                : "Add a new activity!"}
            </Typography>
          </Box>
        }
      />
      <Stack gap={2}>
        <Box sx={{ display: showForm ? "block" : "none", pb: 2 }}>
          <ActivityForm handleClose={() => setShowForm(false)} />
        </Box>
        <If
          condition={isLoading}
          then={<ListSkeleton />}
          else={
            <>
              {activities?.map((activity) => (
                <ListItem
                  key={activity.id}
                  activity={activity}
                  onDelete={handleDeleteActivity}
                  onComplete={handleCompleteActivity}
                  onUncomplete={handleUncompleteActivity}
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
