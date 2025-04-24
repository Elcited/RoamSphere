export default function parseAttractionsResult(attractionsList) {
  const parsedAttractionResult = attractionsList.map(attraction => {
    return {
      position_id: attraction.position_id,
      name: attraction.name,
      address: attraction.address,
      location: attraction.location,
      citycode: attraction.citycode,
      adcode: attraction.adcode,
      pname: attraction.pname,
      cityname: attraction.cityname,
      adname: attraction.adname,
      type: attraction.type,
      business: attraction.business,
      navi: attraction.navi,
      indoor: attraction.indoor,
      photos: attraction.photos,
    };
  });

  return parsedAttractionResult;
}
