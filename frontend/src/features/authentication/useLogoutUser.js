import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useLogoutUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("登出失败");
      }

      return response.json();
    },
    onSuccess: () => {
      // 清理当前用户数据
      queryClient.removeQueries(["currentUser"]);
      queryClient.invalidateQueries(["currentUser"]);
      queryClient.invalidateQueries(["currentUser", "favorites"]);
      // 刷新页面
      window.location.reload();
    },
  });
}
