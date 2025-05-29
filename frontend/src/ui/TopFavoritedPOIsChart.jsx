import ReactECharts from "echarts-for-react";
import { useQuery } from "@tanstack/react-query";

async function fetchTopFavoritedPOIs() {
  const res = await fetch("/api/userActivity/top-favorited-pois");
  if (!res.ok) throw new Error("Network response not ok");
  return res.json();
}

export default function TopFavoritedPOIsChart() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["topFavoritedPOIs"],
    queryFn: fetchTopFavoritedPOIs,
  });

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>加载出错: {error.message}</div>;

  const topPOIs = data.topPOIs || [];

  const option = {
    title: { text: "热门收藏POI排行榜" },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: topPOIs.map(item => item.name || "未知POI"),
      axisLabel: { rotate: 30, interval: 0 },
    },
    yAxis: { type: "value" },
    series: [
      {
        data: topPOIs.map(item => item.count),
        type: "bar",
        itemStyle: { color: "#5470C6" },
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: 300, marginBottom: 40 }} />
  );
}
