import { useQuery } from "@tanstack/react-query";
import ReactECharts from "echarts-for-react";
import ChartContainer from "./ChartContainer";
import NoDataFallback from "./NoDataFallback";

async function fetchFavoriteTrend() {
  const res = await fetch("/api/userActivity/favorite-poi-trend");
  if (!res.ok) throw new Error("Failed to fetch favorite trend");
  const json = await res.json();
  return json.trend;
}

async function fetchPlatformFavoriteTrend() {
  const res = await fetch(
    "/api/userActivity/stats/favorite-poi-trend/platform"
  );
  if (!res.ok) throw new Error("Failed to fetch platform favorite trend");
  const json = await res.json();
  return json.trend;
}

export default function FavoriteTrendChart() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["favoriteTrend"],
    queryFn: fetchFavoriteTrend,
  });

  const { data: fallbackData } = useQuery({
    queryKey: ["platformStats", "favoriteTrend"],
    queryFn: fetchPlatformFavoriteTrend,
    enabled: !data || data.length === 0,
  });

  if (
    (!data || data.length === 0) &&
    (!fallbackData || fallbackData.length === 0)
  ) {
    return <NoDataFallback message="暂无收藏趋势数据" />;
  }

  const displayData = data && data.length > 0 ? data : fallbackData;
  const isFallback = !data || data.length === 0;

  const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().slice(0, 10);
  });

  const dateMap = {};
  displayData?.forEach(item => {
    dateMap[item._id] = item.count;
  });

  const counts = dates.map(date => dateMap[date] || 0);

  const option = {
    title: {
      text: isFallback
        ? "收藏趋势（过去30天，平台统计）"
        : "收藏趋势（过去30天）",
      left: "center",
    },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: dates,
      boundaryGap: false,
    },
    yAxis: { type: "value", minInterval: 1 },
    dataZoom: [
      { type: "slider", start: 70, end: 100, bottom: 10 },
      { type: "inside" },
    ],
    series: [
      {
        name: "收藏数",
        type: "line",
        data: counts,
        smooth: true,
        lineStyle: { width: 3 },
        itemStyle: { color: "#5470C6" },
        areaStyle: { color: "rgba(84, 112, 198, 0.2)" },
        emphasis: { focus: "series" },
      },
    ],
    grid: { left: 50, right: 30, bottom: 70 },
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
