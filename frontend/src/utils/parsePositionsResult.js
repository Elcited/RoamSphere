export default function parsePositionsResult(positionsList) {
  const parsedPositionResult = positionsList?.map(position => {
    return {
      id: position._id,
      position_id: position.position_id,
      name: position.name,
      address: position.address,
      location: position.location,
      citycode: position.citycode,
      adcode: position.adcode,
      pname: position.pname,
      cityname: position.cityname,
      adname: position.adname,
      type: position.type,
      typeCode: position.typeCode,
      business: position.business,
      navi: position.navi,
      indoor: position.indoor,
      photos: position.photos,
    };
  });

  return parsedPositionResult;
}
