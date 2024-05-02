
import { SnackbarKey, VariantType, useSnackbar } from 'notistack';
import { formatTitleCase } from '../utils/formatters';

export type ErrorObject = {
  message: string;
  status: number;
};

interface UseToastProps {
  toastSuccess: (message: string, duration?: number) => SnackbarKey;
  toastError: (message: string, duration?: number) => SnackbarKey;
  toastWarning: (message: string, duration?: number) => SnackbarKey;
  toast: (
    message: string,
    statusCode?: number,
    duration?: number
  ) => SnackbarKey;
  closeToast: (key?: SnackbarKey) => void;
}

export const useToast = (): UseToastProps => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const toastSuccess = (message: string, duration?: number) =>
    enqueueSnackbar(('Success! ' + message), {
      variant: 'success',
      autoHideDuration: duration
    });

  const toastError = (message: string, duration?: number) =>
    enqueueSnackbar(('Error! ' + message), {
      variant: 'error',
      autoHideDuration: duration
    });

  const toastWarning = (message: string, duration?: number) =>
    enqueueSnackbar(('Warning! ' + message), {
      variant: 'warning',
      autoHideDuration: duration
    });

  // Generic toast based on status code
  const toast = (message: string, status?: number, duration?: number) => {
    let variant: VariantType = 'default';
    if (!status) {
      variant = 'error';
    } else if (status >= 200 && status < 300) {
      variant = 'success';
    } else if (status >= 300 && status < 400) {
      variant = 'info';
    } else if (status >= 400 && status < 500) {
      variant = 'warning';
    } else if (status >= 500) {
      variant = 'error';
    }
    return enqueueSnackbar((formatTitleCase(variant) + ' ' + message), {
      variant: variant,
      autoHideDuration: duration
    });
  };

  const closeToast = (key?: SnackbarKey) => {
    closeSnackbar(key);
  };

  return {
    toastSuccess,
    toastError,
    toastWarning,
    toast,
    closeToast
  };
};