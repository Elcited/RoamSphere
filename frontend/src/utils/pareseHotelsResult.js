export default function parseHotelsResult(hotelsList) {
  const parsedHotelResult = hotelsList.map(hotel => {
    return {
      position_id: hotel.position_id,
      name: hotel.name,
      address: hotel.address,
      location: hotel.location,
      citycode: hotel.citycode,
      adcode: hotel.adcode,
      pname: hotel.pname,
      cityname: hotel.cityname,
      adname: hotel.adname,
      type: hotel.type,
      business: hotel.business,
      navi: hotel.navi,
      indoor: hotel.indoor,
      photos: hotel.photos,
    };
  });

  return parsedHotelResult;
}
