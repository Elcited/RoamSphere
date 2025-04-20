export default function parseAttractionsResult(attractionsList) {
  console.log(attractionsList);

  const parsedAttractionResult = attractionsList.map(attraction => {
    return {
      attraction_id: attraction.attraction_id,
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
