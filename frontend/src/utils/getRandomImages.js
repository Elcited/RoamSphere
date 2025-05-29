import cityImageMap from "../constants/cityImageMap";

export default function getRandomImages(count) {
  const shuffled = [...cityImageMap].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
