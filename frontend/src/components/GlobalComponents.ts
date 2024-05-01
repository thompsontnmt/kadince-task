import { Box, styled } from "@mui/material";

export const MainBox = styled(Box)(({ theme }) => ({
  padding: '24px',
  margin: '0 auto',
  maxWidth: 'none',
  [theme.breakpoints.up('lg')]: {
    maxWidth: '1000px'
  },
  color: theme.palette.background.paper
}));

export const ModalBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    position: 'absolute',
    padding: '24px',
    top: '16%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    borderRadius: '6px',
    overflow: 'auto',
    height: '20%',
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '80%',
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      width: '70%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '50%',
    }
}));