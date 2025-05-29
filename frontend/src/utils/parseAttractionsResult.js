export default function parseAttractionsResult(attractionsList) {
  const parsedAttractionResult = attractionsList?.map(attraction => {
    return {
      id: attraction._id,
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
      typeCode: attraction.typeCode,
      business: attraction.business,
      navi: attraction.navi,
      indoor: attraction.indoor,
      photos: attraction.photos,
    };
  });

  return parsedAttractionResult;
}
