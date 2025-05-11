export default function extractTransitTypes(segments = []) {
  const result = [];

  const cleanName = (name, type) => {
    if (!name) return undefined;
    name = name.trim();

    // 去掉括号内容
    const mainPart = name.replace(/\(.*?\)/g, "").trim();

    if (type === "subway") {
      const match = mainPart.match(/(?:地铁)?([\d一二三四五六七八九十]+号线)/);
      return match ? match[1] : mainPart;
    }

    if (type === "bus") {
      const match = mainPart.match(/([\u4e00-\u9fa5]*\d+号线|\d+路|\d+)/);
      return match ? match[1] : mainPart;
    }

    if (type === "cityRailway") {
      const match = name.match(/\(([^()]+)\)/);
      return match ? match[1].trim() : name;
    }

    if (type === "railway") {
      return name;
    }

    return undefined;
  };

  for (const seg of segments) {
    if (seg.walking && seg.walking.distance) {
      result.push({ type: "walking" });
    }

    if (Array.isArray(seg.subway) && seg.subway.length) {
      const name = cleanName(seg.subway[0].name, "subway");
      result.push({ type: "subway", name });
    }

    if (Array.isArray(seg.bus) && seg.bus.length) {
      const name = cleanName(seg.bus[0].name, "bus");
      result.push({ type: "bus", name });
    }

    if (Array.isArray(seg.cityRailway) && seg.cityRailway.length) {
      const name = cleanName(seg.cityRailway[0].name, "cityRailway");
      result.push({ type: "cityRailway", name });
    }

    if (seg.railway) {
      const name = cleanName(seg.railway.name, "railway");
      result.push({ type: "railway", name });
    }

    if (seg.taxi) {
      result.push({ type: "taxi" });
    }
  }

  // 如果最后一个 segment 是步行，且上一个不是步行，则再补一次
  const last = segments[segments.length - 1];
  if (
    last?.walking &&
    last.walking.distance &&
    result[result.length - 1]?.type !== "walking"
  ) {
    result.push({ type: "walking" });
  }

  return result;
}
