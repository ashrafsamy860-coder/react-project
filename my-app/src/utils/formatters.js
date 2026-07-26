export function formatDate(dateStr) {
  if (!dateStr) return "-";
  return dateStr;
}

export function truncate(text, max = 60) {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max)}...` : text;
}
