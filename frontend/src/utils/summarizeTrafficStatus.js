export default function summarizeTrafficStatus(trafficData, travelMode) {
  if (!(travelMode === "driving")) return null;
  // 遍历每一条路线数据
  for (let segment of trafficData) {
    let totalCount = segment.length;
    let smoothCount = segment.filter(status => status === "畅通").length;

    // 检查是否存在严重拥堵
    if (segment.includes("严重拥堵")) {
      return "当前存在严重拥堵路段";
    }

    // 如果畅通的比例大于等于70%，则返回“当前路段畅通”
    if (smoothCount / totalCount >= 0.7) {
      return "当前路段畅通";
    }
  }

  // 如果没有严重拥堵且畅通比例不足70%，则返回默认的状态
  return "当前路段情况未知";
}
