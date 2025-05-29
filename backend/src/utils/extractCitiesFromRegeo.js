const extractCitynamesFromGeo = (startInfo, endInfo) => {
  const startCity = startInfo?.regeocode?.addressComponent?.city;
  const endCity = endInfo?.regeocode?.addressComponent?.city;

  const cities = [startCity, endCity].filter(Boolean);
  const uniqueCities = [...new Set(cities)];
  return uniqueCities.map(city => ({ cityname: city }));
};

module.exports = extractCitynamesFromGeo;
