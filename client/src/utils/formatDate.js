import { format } from "date-fns";

export function formatDate(dateString) {
  return format(new Date(dateString), "MMM d, yyyy");
}

export function formatDateTime(dateString) {
  return format(new Date(dateString), "MMM d, yyyy, HH:mm");
}

export function formatCalendarDate(dateString) {
  return format(new Date(dateString), "yyyy-MM-dd");
}
