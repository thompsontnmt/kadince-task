import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Header = ({ onAddClick }) => {
    return (
        <Box>
            <Button variant='contained' onClick={onAddClick} color="info"
            startIcon={<AddIcon />}
            >
            <Typography variant="h6">Add Activity</Typography>
            </Button>
        </Box>
    );
}

export default Header;
