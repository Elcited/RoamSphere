export default function formatDistance(distanceInMeters) {
  if (!distanceInMeters || distanceInMeters <= 0) return "";
  const distance = Number(distanceInMeters);

  if (!distance || distance <= 0) return "";

  const distanceInKm = distance / 1000;
  return `${distanceInKm.toFixed(2)}公里`;
}
