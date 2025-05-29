export function getCityImage(cityName) {
  const normalized = cityName.toLowerCase();
  return `/images/popularCities/${normalized}.jpg`;
}
