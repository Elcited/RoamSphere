export default function getOpenStatus(opentime) {
  if (!opentime || !opentime.includes("-")) return "unknown";

  const [startStr, endStr] = opentime.split("-").map(s => s.trim());

  const now = new Date();
  const nowHour = now.getHours();
  const nowMin = now.getMinutes();
  const nowMinutes = nowHour * 60 + nowMin;

  const [startHour, startMin] = startStr.split(":").map(Number);
  const [endHour, endMin] = endStr.split(":").map(Number);
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;

  if (isNaN(startMinutes) || isNaN(endMinutes)) return "unknown";

  if (nowMinutes < startMinutes || nowMinutes >= endMinutes) return "closed";

  const minutesToClose = endMinutes - nowMinutes;
  if (minutesToClose <= 30) return "closing_soon";

  return "open";
}
