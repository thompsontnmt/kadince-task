import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: "#f5f5f5",
      paper: "#D9D9D9",
    },
  },
  components: {
    MuiIconButton: {
      variants: [
        {
          props: { color: "info" },
          style: {
            "&:disabled": {
              opacity: 0.2,
              color: "#2196f3",
            },
          },
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",  // No uppercase transformation
          variants: [
            {
              props: { color: "info" },
              style: {
                "&:disabled": {
                  opacity: 0.5,
                  backgroundColor: "#2196f3",
                  color: '#fff'
                },
              },
              props: { variant: "outlined", color: "secondary" },
              style: {
                  backgroundColor: "#fff !important",
                  color: '#2196f3',
                  borderColor: '#2196f3',
                  "&:hover": {
                    opacity: 0.5,
                    borderColor: '#2196f3',
                    backgroundColor: "#90caf9 !important",
                  }
              },
            },
          ],
        },
      },
    },
  },
});

export default theme;