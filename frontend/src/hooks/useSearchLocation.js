import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

function useSearchPosition(keyword, city = "010") {
  const [placeSearch, setPlaceSearch] = useState(null);

  useEffect(() => {
    AMap.plugin("AMap.PlaceSearch", () => {
      const searchInstance = new AMap.PlaceSearch({ city });
      setPlaceSearch(searchInstance);
    });
  }, [city]);

  const fetchSearchResults = async () => {
    if (!placeSearch || !keyword) return null;

    return new Promise((resolve, reject) => {
      placeSearch.search(keyword, (status, result) => {
        if (status === "complete" && result.info === "OK") {
          resolve(result.poiList.pois);
        } else {
          reject(new Error("搜索失败"));
        }
      });
    });
  };

  return useQuery({
    queryKey: ["searchPosition", keyword, city],
    queryFn: fetchSearchResults,
    enabled: !!placeSearch && !!keyword, // 仅当 placeSearch 存在且 keyword 不为空时查询
    staleTime: 1000 * 60 * 5, // 缓存 5 分钟
  });
}

export default useSearchPosition;
