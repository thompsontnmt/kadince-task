import { format } from 'date-fns';

/**
 * Formats a date and time string.
 * @param {Date | string | number} dateString - The date to format.
 * @param {string} fmt - The format string.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (dateString, fmt = "PPpp") => {
  const date = new Date(dateString);
  return format(date, "MM/dd/yyyy hh:mm aa");
}