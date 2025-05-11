function formatTimeValue(time) {
  if (typeof time !== "number") return "未知";
  const hours = Math.floor(time / 100);
  const minutes = time % 100;
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}

export default function extractTimeRange(segmentField) {
  const results = [];

  // 处理 bus / subway / cityRailway（数组结构）
  if (Array.isArray(segmentField)) {
    for (const item of segmentField) {
      if (
        typeof item.startTime === "number" &&
        typeof item.endTime === "number"
      ) {
        const timeRange = `${formatTimeValue(
          item.startTime
        )} - ${formatTimeValue(item.endTime)}`;
        const departure = item.departureStop?.name || "起点未知";
        const arrival = item.arrivalStop?.name || "终点未知";
        results.push({
          timeRange,
          departure,
          arrival,
          fullText: `${departure} → ${arrival}（${timeRange}）`,
        });
      }
    }
  }

  // 处理 railway（对象结构，时间在 departureStop 和 arrivalStop 中）
  else if (
    segmentField?.departureStop?.time &&
    segmentField?.arrivalStop?.time
  ) {
    const start = segmentField.departureStop.time;
    const end = segmentField.arrivalStop.time;
    const departure = segmentField.departureStop.name || "起点未知";
    const arrival = segmentField.arrivalStop.name || "终点未知";
    const timeRange = `${formatTimeValue(start)} - ${formatTimeValue(end)}`;
    results.push({
      timeRange,
      departure,
      arrival,
      fullText: `${departure} → ${arrival}（${timeRange}）`,
    });
  }

  // 处理 taxi（对象结构，只有 drivetime）
  else if (typeof segmentField?.drivetime === "number") {
    const minutes = Math.floor(segmentField.drivetime / 60);
    results.push({
      timeRange: `${minutes}分钟`,
      departure: "打车起点",
      arrival: "打车终点",
      fullText: `出租车行程约 ${minutes} 分钟`,
    });
  }

  // 如果都不是，返回默认内容
  if (results.length === 0) {
    results.push({
      timeRange: "未知",
      departure: "起点未知",
      arrival: "终点未知",
      fullText: "运营时间未知",
    });
  }

  return results;
}
