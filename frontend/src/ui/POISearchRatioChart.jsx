import ReactECharts from "echarts-for-react";
import { useQuery } from "@tanstack/react-query";

async function fetchPOISearchRatio() {
  const res = await fetch("/api/userActivity/poi-search-ratio");
  if (!res.ok) throw new Error("Network response not ok");
  return res.json();
}

export default function POISearchRatioChart() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["poiSearchRatio"],
    queryFn: fetchPOISearchRatio,
  });

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>加载出错: {error.message}</div>;

  const poiSearchRatio = data.poiSearchRatio || [];

  const option = {
    title: { text: "搜索POI类型占比" },
    tooltip: { trigger: "item" },
    legend: { bottom: 10 },
    series: [
      {
        name: "搜索占比",
        type: "pie",
        radius: "50%",
        data: poiSearchRatio.map(item => ({
          name: item._id || "未知类型",
          value: item.count,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0,0,0,0.5)",
          },
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 300 }} />;
}
