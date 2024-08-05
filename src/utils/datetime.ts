export function formatTime(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const hour = date.getHours() % 12 || 12;
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const afterMiday = date.getHours() >= 12 ? "PM" : "AM";
  return `${hour}:${minutes} ${afterMiday}`;
}
