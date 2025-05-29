function formatAttractionResult(attractionsDataFromAPI) {
  const pois = attractionsDataFromAPI.pois || [];

  return pois.map(poi => {
    const [lng, lat] = poi.location
      ? poi.location.split(",").map(parseFloat)
      : [0, 0];
    const [entrLng, entrLat] = poi.navi?.entr_location
      ? poi.navi.entr_location.split(",").map(parseFloat)
      : [0, 0];

    return {
      position_id: poi.id,
      name: poi.name,
      address: poi.address,
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
      citycode: poi.citycode,
      adcode: poi.adcode,
      pname: poi.pname,
      cityname: poi.cityname,
      adname: poi.adname,
      type: poi.type?.split(";")?.at(-1) || "",
      typecode: poi.typecode,
      business: {
        keytag: poi.business?.keytag,
        rating: poi.business?.rating,
        business_area: poi.business?.business_area,
        opentime_today: poi.business?.opentime_today,
        opentime_week: poi.business?.opentime_week,
        rectag: poi.business?.rectag,
        tel: poi.business?.tel,
        cost: poi.business?.cost,
        tag: poi.business?.tag,
      },
      navi: {
        entr_location: [entrLng, entrLat],
        gridcode: poi.navi?.gridcode,
        navi_poiid: poi.navi?.navi_poiid,
      },
      indoor: {
        indoor_map: poi.indoor?.indoor_map,
      },
      photos: poi.photos || [],
    };
  });
}

module.exports = {
  formatAttractionResult,
};
