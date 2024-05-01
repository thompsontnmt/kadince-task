import React, { useState } from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ModalBox } from '../../components/GlobalComponents';
import ActivityForm from './ActivityForm';

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button variant='contained' onClick={handleOpen} color="info">
        <AddCircleOutlineIcon />
        <Typography>Add Activity</Typography>
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <ModalBox>
          <ActivityForm handleClose={handleClose}/>
        </ModalBox>
      </Modal>
    </Box>
  );
}

export default Header;
