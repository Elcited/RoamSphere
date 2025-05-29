import { useState } from "react";
import { usePrefetchQuery, useQuery } from "@tanstack/react-query";
import ReactECharts from "echarts-for-react";
import NoDataFallback from "./NoDataFallback";
import ChartContainer from "./ChartContainer";
import useAuth from "../features/authentication/useAuth";

async function fetchSearchedOtherPOI() {
  const res = await fetch("/api/userActivity/searched-other-poi-stats");
  if (!res.ok) throw new Error("Failed to fetch searched other POI");
  const json = await res.json();
  return json.data;
}

async function getPlatformSearchedOtherPOIStats() {
  const res = await fetch("/api/userActivity/stats/search-other-poi/platform");
  if (!res.ok) throw new Error("Failed to fetch platform other POI");
  const json = await res.json();
  return json.data;
}

export default function SearchedOtherPOIChart() {
  const { isAuthenticated } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["searchedOtherPOI"],
    queryFn: fetchSearchedOtherPOI,
  });

  const { data: fallbackData } = useQuery({
    queryKey: ["platformStats", "searchOtherPOI"],
    queryFn: getPlatformSearchedOtherPOIStats,
    enabled: !data || data.length === 0 || !isAuthenticated,
  });

  const [selected, setSelected] = useState(null);

  if (!data && isLoading) return <ChartContainer loading />;
  if (error) return <ChartContainer error={error} />;

  // 用户无数据，但平台有 fallback 数据，用柱状图展示
  if (
    (!data || data.length === 0 || !isAuthenticated) &&
    fallbackData &&
    fallbackData.length > 0
  ) {
    const barOption = {
      title: { text: "搜索其他类型 POI（平台统计）", left: "center" },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
      },
      xAxis: {
        type: "category",
        data: fallbackData.map(item => item.type),
        axisLabel: { rotate: 30 },
      },
      yAxis: {
        type: "value",
        name: "搜索次数",
      },
      series: [
        {
          data: fallbackData.map(item => item.count),
          type: "bar",
          itemStyle: {
            color: "#1890ff",
          },
          barMaxWidth: 40,
        },
      ],
    };

    return (
      <ChartContainer title="搜索其他类型 POI（平台统计）">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ReactECharts
            option={barOption}
            style={{ height: 350, width: 500, maxWidth: "100%" }}
          />
        </div>
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
      </ChartContainer>
    );
  }

  // 两种数据都没有
  if (
    (!data || data.length === 0) &&
    (!fallbackData || fallbackData.length === 0)
  ) {
    return <NoDataFallback message="暂无用户或平台搜索记录" />;
  }

  const pieOption = {
    title: { text: "搜索其他POI类型比例", left: "center" },
    tooltip: {
      trigger: "item",
      formatter: ({ name, value, percent }) => `
        <div style="padding: 6px">
          <strong>${name}</strong><br/>
          搜索数：<span style="color: #1890ff">${value}</span><br/>
          占比：${percent}%
        </div>
      `,
    },
    legend: { orient: "vertical", left: "left" },
    series: [
      {
        name: "搜索POI",
        type: "pie",
        radius: ["40%", "70%"],
        itemStyle: {
          borderRadius: 6,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: { show: false },
        emphasis: {
          label: {
            show: true,
            fontSize: 18,
            fontWeight: "bold",
          },
        },
        labelLine: { show: false },
        data: data.map(item => ({
          value: item.count,
          name: item._id,
          selected: selected === item._id,
        })),
        animationType: "scale",
        animationEasing: "elasticOut",
        animationDelay: idx => idx * 100,
      },
    ],
  };

  return (
    <ChartContainer isLoading={isLoading} error={error}>
      <ReactECharts
        option={pieOption}
        onEvents={{
          click: ({ name }) => {
            setSelected(prev => (prev === name ? null : name));
          },
        }}
        style={{ height: 350 }}
      />
      <p style={{ textAlign: "center", fontSize: 12, color: "#999" }}>
        注：统计最近30天用户通过关键词搜索的非景点、非酒店POI类型
      </p>
    </ChartContainer>
  );
}
