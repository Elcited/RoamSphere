import { useMutation } from "@tanstack/react-query";

export default function useSaveRoutes(apiEndpoint) {
  const saveRouteMutation = useMutation({
    mutationFn: async routeData => {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(routeData),
      });
      if (!res.ok) throw new Error("保存路线数据失败");
      return res.json();
    },
  });

  return saveRouteMutation;
}
