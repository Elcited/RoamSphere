import { useQuery } from "@tanstack/react-query";

const fetchFavouritesWithCookie = async (url, options = {}) => {
  const res = await fetch("/api/favorites", {
    ...options,
    credentials: "include", // 关键：让浏览器携带 cookie
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch");
  }

  return res.json();
};

export const useFavorites = () => {
  return useQuery({
    queryKey: ["currentUser", "favorites"],
    queryFn: () => fetchFavouritesWithCookie("/api/favorites"),
    staleTime: 0, // 每次都 stale，始终允许 refetch
    refetchOnWindowFocus: false,
    keepPreviousData: true, // 关键设置
  });
};
