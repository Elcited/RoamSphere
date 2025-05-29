export default function useIsPOIFavorited(
  selectedItem,
  favorites,
  mapMode,
  refTypeMap,
  poiId
) {
  if (!selectedItem || !favorites) return false;

  const currentRefType = refTypeMap[mapMode];

  return favorites?.some(fav => {
    if (fav.refType !== currentRefType) return false;

    if (currentRefType === "ExternalPOI") {
      return fav?.poiId === poiId;
    } else {
      return (
        fav._id === poiId || // populate 展开后的字段
        String(fav._id) === poiId // 原始 ObjectId 对比
      );
    }
  });
}
