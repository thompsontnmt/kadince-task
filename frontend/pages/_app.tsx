import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/theme/theme';
import CssBaseline from '@mui/material/CssBaseline'; 
import { SnackbarProvider } from 'notistack';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/') {
      router.push('/to-do-list');
    }
  }, [router]);

  return (
    <SnackbarProvider maxSnack={3}
    autoHideDuration={3000}
    anchorOrigin={{vertical: 'top',
      horizontal: 'center'
    }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
