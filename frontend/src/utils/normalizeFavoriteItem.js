export function normalizeFavoriteItem(raw) {
  console.log("raw", raw);
  const business = raw.business || {};
  const photos = raw.photos || [];

  return {
    id: raw._id,
    refType: raw.refType,
    name: raw.name,
    address: raw.address,
    type: raw.type || business.keytag || business.rectag || "",
    rating: business.rating || "",
    cost: business.cost || "",
    tags: (business.tag?.split(",") || [])
      .concat([business.keytag, business.rectag])
      .filter(Boolean),
    photo: photos.length > 0 ? photos[0].url : "",
    addedAt: raw.addedAt,
  };
}
