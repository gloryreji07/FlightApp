import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(dateString?: string) {
  if (!dateString) return 'N/A';
  try {
    const date = parseISO(dateString);
    return format(date, "MMM d, yyyy 'at' hh:mm a");
  } catch (error) {
    return 'Invalid Date';
  }
}

export function formatTime(dateString?: string) {
  if (!dateString) return 'N/A';
  try {
    const date = parseISO(dateString);
    return format(date, "hh:mm a");
  } catch (error) {
    return 'Invalid Time';
  }
}
