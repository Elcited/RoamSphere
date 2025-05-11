export default function formatReadableAddress(data) {
  const comp = data.regeocode?.addressComponent;
  if (!comp) return "";

  const province = comp.province || "";
  const city = comp.city || "";
  const district = comp.district || "";
  const township = comp.township || "";
  const street = comp.streetNumber?.street || "";
  const number = comp.streetNumber?.number || "";

  return `${province}${city}${district}${township}${street}${number}`;
}
