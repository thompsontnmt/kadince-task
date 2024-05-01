import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/theme/theme';
import CssBaseline from '@mui/material/CssBaseline'; 

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/') {
      router.push('/to-do-list');
    }
  }, [router]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
