import { useMemo } from "react";

const walkTypeLabels = {
  0: "公路",
  1: "人行横道",
  3: "地下通道",
  4: "过街天桥",
  5: "地铁通道",
  6: "公园区域",
  7: "广场",
  8: "扶梯",
  9: "直梯",
  10: "索道",
  11: "空中通道",
  12: "建筑物内部",
  13: "专用行人通道",
  14: "游船",
  15: "观光车",
  16: "滑道",
  18: "扩宽道路",
  19: "道路连接线",
  20: "阶梯",
  21: "斜坡",
  22: "桥梁",
  23: "隧道",
  30: "轮渡",
};

export default function useWalkTypeLabels(walkTypes) {
  return useMemo(() => {
    if (!Array.isArray(walkTypes)) return [];

    return walkTypes.map(type => walkTypeLabels[type]).filter(Boolean);
  }, [walkTypes]);
}
