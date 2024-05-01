import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/theme/theme'
import CssBaseline from '@mui/material/CssBaseline'; 

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
