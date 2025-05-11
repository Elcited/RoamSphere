import { useMemo } from "react";

const walkTypeHints = {
  1: "需要穿过人行横道",
  3: "需要经过地下通道",
  4: "需要经过过街天桥",
  5: "需要穿越地铁通道",
  6: "可能经过公园区域",
  7: "需要穿越广场",
  8: "需要乘坐扶梯",
  9: "需要乘坐直梯",
  10: "需要乘坐索道",
  11: "需要经过空中通道",
  12: "需要穿越建筑物内部",
  13: "包含专用行人通道",
  14: "需要搭乘游船",
  15: "包含观光车段落",
  16: "需要通过滑道",
  18: "经过扩宽道路",
  19: "包含道路连接线",
  20: "包含阶梯路段",
  21: "包含斜坡",
  22: "需要通过桥梁",
  23: "需要穿过隧道",
  30: "需要乘坐轮渡",
};

export default function useWalkTypeDescription(walkTypes) {
  return useMemo(() => {
    if (!Array.isArray(walkTypes) || walkTypes.length === 0) {
      return "暂无道路类型信息";
    }

    const specialTypes = [...new Set(walkTypes.filter(type => type !== "0"))];

    if (specialTypes.length === 0) {
      return "路线主要为平坦普通道路，无特殊通行要求";
    }

    const hints = specialTypes.map(type => walkTypeHints[type]).filter(Boolean);

    return hints.length > 0
      ? `路线中包含以下特殊通行要求：${hints.join("、")}。`
      : "路线包含一些特殊道路类型，但暂不支持详细提示。";
  }, [walkTypes]);
}
