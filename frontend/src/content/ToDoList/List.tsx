import { CancelTwoTone, CheckCircleTwoTone, EditTwoTone } from '@mui/icons-material'
import { Button, Card, Checkbox, IconButton, Stack, Typography, useTheme } from '@mui/material'
import React, { useCallback } from 'react'
import { useActivities } from '../../hooks/useActivities';
import { AxiosServices } from '../../axios/axiosServices';
import { formatDate } from '../../utils/formatters';
import ListItem from './ListItem';
import ActivityForm from './ActivityForm';
import { UpdateActivityDto } from '../../../generated/api';

const List = ({ showForm, setShowForm }) => {
  const theme = useTheme();
    const { data: activities, mutate } = useActivities();
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

    const handleUpdateActivity = async (id: number, body: UpdateActivityDto) => {
      try {
        await AxiosServices.Activity.updateActivity(id, body);
        mutate();
      } catch (error) {
        console.error("Error updating activity:", error);
      }
    }

  return (
    <Card sx={{p: 4, alignContent: 'center', backgroundColor: theme.palette.background.paper, maxHeight: '800px', overflowY: 'auto'}}>
            <Stack gap={2}>
            {showForm && (
                    <ActivityForm handleClose={() => setShowForm(false)} />
                )}
                {activities?.map((activity) => (
                    <ListItem
                        key={activity.id}
                        activity={activity}
                        onDelete={handleDeleteActivity}
                        onComplete={handleCompleteActivity}
                        onUpdate={handleUpdateActivity}
                    />
                ))}
            </Stack>
        </Card>
  )
}

export default List