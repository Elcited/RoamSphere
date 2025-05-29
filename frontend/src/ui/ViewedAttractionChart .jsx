import { useQuery } from "@tanstack/react-query";
import ReactECharts from "echarts-for-react";
import ChartContainer from "./ChartContainer";
import NoDataFallback from "./NoDataFallback";
import useAuth from "../features/authentication/useAuth";

async function fetchViewedAttractions() {
  const res = await fetch("/api/userActivity/viewed-attractions-stats");
  if (!res.ok) throw new Error("Failed to fetch viewed attractions");
  const json = await res.json();
  return json.data;
}

async function fetchPlatformViewedAttractions() {
  const res = await fetch(
    "/api/userActivity/stats/viewed-attractions/platform"
  );
  if (!res.ok) throw new Error("Failed to fetch platform viewed attractions");
  const json = await res.json();
  return json.data;
}

export default function ViewedAttractionChart() {
  const { isAuthenticated } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["viewedAttractions"],
    queryFn: fetchViewedAttractions,
  });

  const { data: fallbackData } = useQuery({
    queryKey: ["platformStats", "viewedAttractions"],
    queryFn: fetchPlatformViewedAttractions,
    enabled: !data || data.length === 0 || !isAuthenticated,
  });

  if (
    (!data || data.length === 0) &&
    (!fallbackData || fallbackData.length === 0)
  ) {
    return <NoDataFallback message="暂无浏览景点记录" />;
  }

  const displayData = data && data.length > 0 ? data : fallbackData;
  const isFallback = !data || data.length === 0 || !isAuthenticated;

  const sortedData = [...displayData].sort((a, b) => b.count - a.count);
  const names = sortedData.map(item => item.name);
  const counts = sortedData.map(item => item.count);

  const option = {
    title: {
      text: isFallback ? "浏览景点统计（平台统计）" : "浏览景点统计",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: ([p]) => `${p.name}<br/>浏览次数: ${p.value}`,
    },
    xAxis: {
      type: "category",
      data: names,
      axisLabel: { rotate: 45, interval: 0 },
    },
    yAxis: { type: "value", minInterval: 1 },
    series: [
      {
        data: counts,
        type: "bar",
        itemStyle: { color: "#91CC75" },
        emphasis: {
          itemStyle: { color: "#73C0DE" },
        },
      },
    ],
    grid: { bottom: 100, left: 60, right: 30 },
  };

  return (
    <ChartContainer isLoading={isLoading} error={error}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ReactECharts
          option={option}
          style={{ width: 500, maxWidth: "100%", height: 350 }}
        />
      </div>
      {isFallback && (
        <div
          style={{
            fontSize: 12,
            color: "#999",
            marginTop: 4,
            textAlign: "center",
          }}
        >
          （暂无你的数据，展示平台统计）
        </div>
      )}
    </ChartContainer>
  );
}
