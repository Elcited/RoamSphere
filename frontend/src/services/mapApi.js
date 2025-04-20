import { useQuery } from "@tanstack/react-query";

export function useCheckRoutesDB(route_hash) {
  return useQuery({
    queryKey: ["db_routes", route_hash],
    queryFn: async () => {
      const res = await fetch(`/api/routes/get_routes?key=${route_hash}`);

      if (res.status === 404) {
        throw new Error("路线未缓存");
      }

      if (!res.ok) {
        throw new Error("获取路线失败");
      }

      return res.json();
    },
    staleTime: 1000 * 60 * 10,
    retry: false,
  });
}
