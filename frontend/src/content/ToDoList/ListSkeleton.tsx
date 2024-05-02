import React from 'react';
import { Box, Card, Stack, Skeleton } from '@mui/material';

const ListSkeleton = () => {
  const skeletonCount = 5;

  return (
    <Card sx={{ p: 4, alignContent: 'center', backgroundColor: 'background.default', maxHeight: '800px'}}>
      <Stack gap={2}>
        {Array.from(new Array(skeletonCount)).map((_, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            <Skeleton variant='rectangular' width="10%" height={60}/>
            <Skeleton variant="rectangular" width="100%" height={60} sx={{ flexGrow: 1, mx: 2 }} />
            <Stack direction={'row'} gap={2}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="circular" width={40} height={40} />
            </Stack>
          </Box>
        ))}
      </Stack>
    </Card>
  );
};

export default ListSkeleton;
