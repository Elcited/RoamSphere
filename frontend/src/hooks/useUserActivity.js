import { useMutation } from "@tanstack/react-query";

/**
 * 使用示例：
 * mutate({ endpoint: "view-attraction", id: "6651abc..." })
 */
const postActivity = async ({ endpoint, data }) => {
  const res = await fetch(`/api/userActivity/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errMsg = await res.text();
    throw new Error(`埋点失败: ${errMsg}`);
  }

  return await res.json();
};

export const useUserActivity = () => {
  return useMutation({
    mutationFn: postActivity,
    onSuccess: () => {
      console.log("收集用户行为成功！");
    },
    onError: err => {
      console.warn("埋点失败", err.message);
    },
  });
};
