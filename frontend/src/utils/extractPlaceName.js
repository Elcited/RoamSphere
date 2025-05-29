export default function extractPlaceName(placeName) {
  const match = placeName.match(/^(.+?)\s*\(/);
  return match ? match[1].trim() : placeName;
}
