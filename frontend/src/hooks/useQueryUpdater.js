import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

/**
 * 更新 URL 查询参数，并可选择跳转、传递 state、控制是否 replace。
 */
function useQueryUpdater() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * @param {Object} changes 要更新的 query 参数，设置为 null/undefined 会被删除
   * @param {string} [path] 要跳转的路径，默认当前路径
   * @param {Object} [options] 可选项：
   *  - replace {boolean} 是否使用 replace 模式
   *  - state {any} 传递给 navigate 的 state
   */
  const updateQueryAndNavigate = (
    changes = {},
    path = location.pathname,
    options = {}
  ) => {
    /* 就算不传 state 也不会报错，navigate 函数允许 state 为 undefined */
    const { replace = false, state } = options;

    const updatedParams = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(changes)) {
      if (value === null || value === undefined) {
        updatedParams.delete(key);
      } else {
        updatedParams.set(key, value);
      }
    }

    const queryStr = updatedParams.toString();
    const fullPath = queryStr ? `${path}?${queryStr}` : path;

    navigate(fullPath, { replace, state });
  };

  return { updateQueryAndNavigate };
}

export default useQueryUpdater;
