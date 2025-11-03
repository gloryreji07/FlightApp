import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const toDate = (dateString: string) => {
    const date = parseISO(dateString);
    // Assume the API provides times in UTC and we want to display them as such, regardless of server/client timezone.
    // To format in a specific timezone, you would use a library like date-fns-tz.
    // For now, let's ensure we treat the date consistently.
    // A simple way is to format it as UTC.
    // A better way might be to parse it into a specific timezone if the API implies one.
    // Let's assume UTC for now.
    return utcToZonedTime(date, 'Etc/UTC');
}


export function formatDateTime(dateString?: string) {
  if (!dateString) return 'N/A';
  try {
    const date = toDate(dateString);
    return format(date, "MMM d, yyyy 'at' hh:mm a");
  } catch (error) {
    return 'Invalid Date';
  }
}

export function formatTime(dateString?: string) {
  if (!dateString) return 'N/A';
  try {
    const date = toDate(dateString);
    return format(date, "hh:mm a");
  } catch (error) {
    return 'Invalid Time';
  }
}
