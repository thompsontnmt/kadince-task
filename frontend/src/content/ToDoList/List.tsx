import { CancelTwoTone, CheckCircleTwoTone, EditTwoTone } from '@mui/icons-material';
import { Box, Button, Card, Checkbox, IconButton, Stack, Typography, useTheme } from '@mui/material';
import React, { useCallback } from 'react';
import { useActivities } from '../../hooks/useActivities';
import { AxiosServices } from '../../axios/axiosServices';
import { formatDate } from '../../utils/formatters';
import ListItem from './ListItem';
import ActivityForm from './ActivityForm';
import { UpdateActivityDto } from '../../../generated/api';
import If from '../../components/If';

const List = ({ showForm, setShowForm }) => {
  const theme = useTheme();
  const { data: activities, mutate, isLoading } = useActivities();

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

  const handleCompleteActivity = useCallback(
    async (id) => {
      try {
        await AxiosServices.Activity.updateActivityComplete(id);
        mutate();
      } catch (error) {
        console.error("Error completing activity:", error);
      }
    },
    [mutate]
  );

  const handleUpdateActivity = async (id, body) => {
    try {
      await AxiosServices.Activity.updateActivity(id, body);
      mutate();
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };

  return (
    <Card sx={{ p: 4, alignContent: 'center', backgroundColor: theme.palette.background.paper, maxHeight: '800px', overflowY: 'auto' }}>
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
          then={<Typography>Loading...</Typography>}
          else={(
            <>
              {activities && activities.map((activity) => (
                <ListItem
                  key={activity.id}
                  activity={activity}
                  onDelete={handleDeleteActivity}
                  onComplete={handleCompleteActivity}
                  onUpdate={handleUpdateActivity}
                />
              ))}
            </>
          )}
        />
      </Stack>
    </Card>
  );
};

export default List;
