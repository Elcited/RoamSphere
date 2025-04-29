function calculateTotalRoadDistance(roadDistance) {
  if (!Array.isArray(roadDistance)) {
    return [];
  }

  return roadDistance.map(distances => {
    if (!Array.isArray(distances)) {
      return 0;
    }

    return distances.reduce((sum, distance) => {
      const validDistance = Number(distance);
      return sum + (isNaN(validDistance) ? 0 : validDistance);
    }, 0);
  });
}

function evaluateRoadStatus(roadStatus) {
  if (!Array.isArray(roadStatus)) {
    return [];
  }

  return roadStatus.map(statusArray => {
    if (!Array.isArray(statusArray)) {
      return "无效的路况数据";
    }

    const statusSet = new Set(statusArray);

    if ([...statusSet].some(s => s?.includes("严重拥堵"))) {
      return "严重拥堵，建议绕道通行";
    }
    if ([...statusSet].some(s => s?.includes("拥堵"))) {
      return "前方路况拥堵";
    }
    if ([...statusSet].some(s => s?.includes("缓行"))) {
      return "路况缓行，请注意";
    }
    if ([...statusSet].some(s => s?.includes("未知"))) {
      return "路况未知，小心通行";
    }
    if ([...statusSet].some(s => s?.includes("畅通"))) {
      return "路况畅通，方便通行";
    }

    return "无有效信息";
  });
}

export { calculateTotalRoadDistance, evaluateRoadStatus };
