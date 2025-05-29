import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateUserInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async updatedInfo => {
      const response = await fetch("/api/users/updateMe", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedInfo),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "更新信息失败");
      }

      return response.json();
    },
    onSuccess: () => {
      console.log("update user information");
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
}
