import { useQueryClient } from "@tanstack/react-query";

export default function useAttractionData({ attractionCoordinate }) {
  const queryClient = useQueryClient();
  const { data: attractionData, isLoading } = queryClient.getQueryData([
    "attractions",
    attractionCoordinate,
  ]);

  return attractionData;
}
