import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Header = ({ onAddClick }) => {
    return (
        <Box>
            <Button variant='contained' onClick={onAddClick} color="info">
                <AddCircleOutlineIcon />
                <Typography>Add Activity</Typography>
            </Button>
        </Box>
    );
}

export default Header;
