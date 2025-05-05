export default function formatDuration(durationInSeconds) {
  if (!durationInSeconds || durationInSeconds <= 0) return "";

  const duration = Number(durationInSeconds) || 0;

  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);

  let result = "";

  if (hours > 0) {
    result += `${hours}小时`;
  }
  if (minutes > 0) {
    if (result) result += " ";
    result += `${minutes}分钟`;
  }

  if (result === "") {
    result = "0分钟";
  }

  return result.trim();
}
