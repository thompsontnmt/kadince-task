import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/theme/theme';
import CssBaseline from '@mui/material/CssBaseline';

export function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Check if the current path is the root and redirect if it is
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
