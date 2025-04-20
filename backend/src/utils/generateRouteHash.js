const crypto = require("crypto");

function generateRouteHash({
  strategy,
  mode,
  startLng,
  startLat,
  endLng,
  endLat,
}) {
  const raw = {
    strategy,
    mode,
    startLng,
    startLat,
    endLng,
    endLat,
  };

  const str = JSON.stringify(raw);

  // 使用 crypto 生成 SHA256 哈希值
  const hash = crypto.createHash("sha256").update(str).digest("hex");

  return hash;
}

module.exports = generateRouteHash;
