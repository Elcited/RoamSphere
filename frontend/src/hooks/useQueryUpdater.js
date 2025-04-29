import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

/**
 * 更新 URL 查询参数，并可选择跳转、传递 state、控制是否 replace。
 * 新增支持 clearOthers 和 keep 保留字段。
 */
function useQueryUpdater() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * @param {Object} changes 要更新的 query 参数，设置为 null/undefined 会被删除
   * @param {string} [path] 要跳转的路径，默认当前路径
   * @param {Object} [options]
   *  - replace {boolean} 是否使用 replace 模式
   *  - state {any} 传递给 navigate 的 state
   *  - clearOthers {boolean} 是否清除未传入的其他参数
   *  - keep {string[]} 保留指定的参数（配合 clearOthers 使用）
   */
  const updateQueryAndNavigate = (
    changes = {},
    path = location.pathname,
    options = {}
  ) => {
    const { replace = false, state, clearOthers = false, keep = [] } = options;

    let updatedParams = clearOthers
      ? new URLSearchParams()
      : new URLSearchParams(searchParams);

    if (clearOthers && keep.length > 0) {
      keep.forEach(key => {
        const value = searchParams.get(key);
        if (value !== null) {
          updatedParams.set(key, value);
        }
      });
    }

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
