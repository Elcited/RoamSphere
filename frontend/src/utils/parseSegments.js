const summarizeSegments = segments => {
  if (!segments || !Array.isArray(segments)) return [];

  const summary = [];

  segments.forEach(segment => {
    if (segment.walking) {
      const distance = segment.walking.distance || 0;
      if (distance > 0) {
        summary.push(`🚶 步行${Math.round(distance)}米`);
      }
    }

    if (
      segment.bus &&
      segment.bus.buslines &&
      segment.bus.buslines.length > 0
    ) {
      const busNames = segment.bus.buslines
        .map(line => line.name.replace(/\(.*?\)/g, ""))
        .join(" / ");
      summary.push(`🚌 ${busNames}`);
    }

    if (segment.railway) {
      const railwayName = segment.railway.name || "地铁";
      summary.push(`🚇 ${railwayName}`);
    }

    if (segment.taxi) {
      const distance = segment.taxi.distance || 0;
      summary.push(`🚖 打车${Math.round(distance)}米`);
    }
  });

  return summary;
};

const summarizeTransits = route => {
  if (!route || !route.transits || !Array.isArray(route.transits)) return "";

  const summaries = [];

  route.transits.forEach((transit, index) => {
    const parts = [];

    // 总时间
    if (transit.duration) {
      const minutes = Math.ceil(transit.duration / 60);
      parts.push(`约${minutes}分钟`);
    }

    // 总距离
    if (transit.distance) {
      const distanceKm = (parseInt(transit.distance, 10) / 1000).toFixed(1);
      parts.push(`全程${distanceKm}公里`);
    }

    // 预计费用（如果有的话）
    if (transit.cost) {
      parts.push(`费用约${transit.cost}元`);
    }

    // 步行总距离
    if (transit.walking_distance) {
      const walkKm = (parseInt(transit.walking_distance, 10) / 1000).toFixed(1);
      parts.push(`步行${walkKm}公里`);
    }

    // 换乘线路总结
    const segmentSummary = summarizeSegments(transit.segments).join(" → ");

    summaries.push(
      `方案${index + 1}：${parts.join("，")}，线路：${segmentSummary}`
    );
  });

  return summaries;
};

const summarizeRouteInfo = route => {
  return {
    origin: route.origin, // 起点经纬度
    destination: route.destination, // 终点经纬度
    distance: route.distance, // 路线总距离
    cost: route.cost, // 路线总费用（如打车费用）
  };
};

const summarizeSteps = segments => {
  return segments
    .map(segment => {
      if (segment.walking) {
        return segment.walking.steps.map(step => ({
          instruction: step.instruction, // 步行指令
          road: step.road, // 道路名称
          polyline: step.polyline.polyline, // 步行路线
        }));
      }
      if (segment.bus) {
        return segment.bus.buslines.map(busline => ({
          busName: busline.name, // 公交名称
          departureStop: busline.departure_stop.name, // 出发站
          arrivalStop: busline.arrival_stop.name, // 到达站
          polyline: busline.polyline.polyline, // 公交路线
        }));
      }
    })
    .flat();
};

const summarizeCostAndDuration = transits => {
  return transits.map(transit => ({
    totalDuration: transit.cost.duration, // 总耗时
    totalCost: transit.cost.transit_fee, // 总交通费用
    taxiFee: transit.cost.taxi_fee, // 打车费用
  }));
};

const summarizeNightFlag = transit => {
  return transit.nightflag === "1" ? "夜班车" : "非夜班车";
};

const summarizeViaStops = transit => {
  return transit.buslines.map(busline => ({
    viaStops: busline.via_stops.map(stop => ({
      name: stop.name, // 途经站点名称
      location: stop.location, // 途经站点位置
    })),
  }));
};

const summarizeSegmentDetails = segments => {
  return segments.map(segment => {
    if (segment.walking) {
      return {
        type: "步行",
        polyline: segment.walking.polyline.polyline,
        steps: segment.walking.steps.map(step => step.instruction), // 步行步骤
      };
    } else if (segment.bus) {
      return {
        type: "公交",
        polyline: segment.bus.polyline.polyline,
        busName: segment.bus.name,
        departureStop: segment.bus.departure_stop.name,
        arrivalStop: segment.bus.arrival_stop.name,
      };
    } else if (segment.railway) {
      return {
        type: "火车",
        polyline: segment.railway.polyline.polyline,
      };
    }
  });
};

const extractDetailedInstructions = steps => {
  return steps.map(step => ({
    instruction: step.instruction,
    action: step.navi.action, // 导航动作
    distance: step.distance, // 距离
  }));
};
