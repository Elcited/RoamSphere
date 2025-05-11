/**
 * 安全获取数组的指定下标项
 * @param {Array} arr - 要访问的数组
 * @param {number} index - 目标索引
 * @returns {*} - 如果索引合法，返回对应项，否则返回 undefined
 */
export default function safeGet(arr, index) {
  return Array.isArray(arr) &&
    typeof index === "number" &&
    index >= 0 &&
    index < arr.length
    ? arr[index]
    : undefined;
}
