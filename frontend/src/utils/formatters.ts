import { format, isValid } from 'date-fns';

/**
 * Formats a date and time string.
 * @param {Date | string | number} dateString - The date to format.
 * @param {string} fmt - The format string.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (dateString, fmt = "PPp") => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (!isValid(date)) {
    console.error("Invalid date passed to formatDate:", dateString);
    return '';
  }

  return format(date, fmt);
}

export const formatTitleCase = (input: string | undefined): string => {
  if (!input) {
    return '';
  }

  if (input.length <= 2) {
    return input.toUpperCase();
  }

  if (input.includes('-')) {
    return input
      .toLowerCase()
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  } else if (input.includes('_')) {
    return input
      .toLowerCase()
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  } else {
    return input
      .toLowerCase()
      .split(' ')
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }
};