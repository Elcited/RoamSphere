async function ensure2DSphereIndex(collection, fieldName = "location") {
  const indexes = await collection.indexes();
  const has2DSphere = indexes.some(idx => idx.key?.[fieldName] === "2dsphere");

  if (!has2DSphere) {
    await collection.createIndex({ [fieldName]: "2dsphere" });
  }
}

module.exports = {
  ensure2DSphereIndex,
};
