const isFullDayOpen = str => {
  if (!str) return false;
  const normalized = str.trim();
  return (
    normalized.includes("24小时") ||
    normalized.includes("全天营业") ||
    normalized.includes("全天开放") ||
    normalized.includes("全年无休")
  );
};

const getOpenStatus = opentime => {
  if (!opentime || typeof opentime !== "string") return "unknown";

  if (isFullDayOpen(opentime)) return "open";

  if (!opentime.includes("-")) return "unknown";

  const [startStr, endStr] = opentime.split("-").map(s => s.trim());

  const now = new Date();
  const nowHour = now.getHours();
  const nowMin = now.getMinutes();
  const nowMinutes = nowHour * 60 + nowMin;

  const [startHour, startMin] = startStr.split(":").map(Number);
  const [endHour, endMin] = endStr.split(":").map(Number);
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;

  if (isNaN(startMinutes) || isNaN(endMinutes)) return "unknown";

  // 跨天支持
  if (endMinutes < startMinutes) {
    if (nowMinutes >= startMinutes || nowMinutes < endMinutes) {
      const minutesToClose =
        nowMinutes >= startMinutes
          ? 1440 - nowMinutes + endMinutes
          : endMinutes - nowMinutes;
      return minutesToClose <= 30 ? "closing_soon" : "open";
    }
    return "closed";
  }

  if (nowMinutes < startMinutes || nowMinutes >= endMinutes) return "closed";

  const minutesToClose = endMinutes - nowMinutes;
  if (minutesToClose <= 30) return "closing_soon";

  return "open";
};

const statusLabel = {
  open: { text: "营业中", color: "#4caf50" },
  closing_soon: { text: "即将打烊", color: "#ff9800" },
  closed: { text: "已打烊", color: "#f44336" },
  unknown: { text: "状态未知", color: "#9e9e9e" },
};

export default function PlaceOpenStatus({ opentime }) {
  const status = getOpenStatus(opentime);
  const { text, color } = statusLabel[status];

  return <span style={{ color, fontWeight: 500 }}>{text}</span>;
}
