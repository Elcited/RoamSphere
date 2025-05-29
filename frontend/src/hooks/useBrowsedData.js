import { useQuery } from "@tanstack/react-query";

async function fetchBrowsedData() {
  const res = await fetch("/api/userActivity/get-browsed-data");
  if (!res.ok) throw new Error("Failed to fetch browsed data");
  return res.json();
}

export function useBrowsedData() {
  return useQuery({
    queryKey: ["browsedData"],
    queryFn: fetchBrowsedData,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
