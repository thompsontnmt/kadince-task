import { AxiosError } from 'axios';
import { ErrorObject } from '../hooks/useToast';
/**
 * This function is used to show toast messages in the UI, it is used in the catch block of an axios request
 * @param e: a full error object
 * @param toast: toast function from useToast
 * @param genericMessage: a generic message to show if the error object does not have a message
 */
export const showToastMessage = (
  e: unknown,
  toast: (message: string, status?: number, duration?: number) => void,
  genericMessage: string = '' // fallback message
) => {
  const error = e as AxiosError<ErrorObject>;
  toast(
    error.response?.data?.message || error.message || genericMessage,
    error.response?.data?.status
  );
};