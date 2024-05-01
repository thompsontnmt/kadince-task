import { CancelTwoTone, CheckCircleTwoTone, EditTwoTone } from '@mui/icons-material'
import { Button, Card, IconButton, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useActivities } from '../../hooks/useActivities';
import { AxiosServices } from '../../axios/axiosServices';

const List = () => {
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

  return (
    <Card sx={{p: 4, alignContent: 'center', backgroundColor: theme.palette.background.paper}}>
       <Stack gap={2}>
        {activities?.map((activity) => (
          <Card key={activity.id} sx={{ backgroundColor: theme.palette.background.default }}>
            <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center', px: 3 }}>
              <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 4 }}>
                <CheckCircleTwoTone color='success' />
                <Stack>
                  <Typography>{activity.title}</Typography>
                  <Typography>{activity.description}</Typography>
                </Stack>
              </Stack>
              <Stack direction='row' alignItems={'center'}>
                <IconButton>
                  <EditTwoTone color='info' />
                </IconButton>
                <IconButton onClick={() => handleDeleteActivity(activity.id)}>
                  <CancelTwoTone color='error' />
                </IconButton>
              </Stack>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Card>
  )
}

export default List