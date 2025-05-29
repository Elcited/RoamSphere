import { useQuery } from "@tanstack/react-query";

const fetchRecommendedCities = async () => {
  const res = await fetch("/api/userActivity/recommend-cities", {
    method: "GET",
    credentials: "include", // 携带 cookie
  });

  if (!res.ok) {
    throw new Error("获取推荐城市失败");
  }

  const result = await res.json();
  return result.data;
};

export function useRecommendedCities() {
  return useQuery({
    queryKey: ["recommendedCities"],
    queryFn: fetchRecommendedCities,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
