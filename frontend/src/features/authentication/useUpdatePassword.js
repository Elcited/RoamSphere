import { useMutation } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";

export default function useUpdatePassword() {
  const mutation = useMutation({
    mutationFn: async ({
      currentPassword,
      newPassword,
      newConfirmPassword,
    }) => {
      const response = await fetch("/api/users/updateMyPassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          currentPassword,
          newPassword,
          newConfirmPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "更新信息失败");
      }

      return response.json();
    },
    onSuccess: () => {
      // toast.success("密码修改成功！");
      console.log("密码修改成功");
    },
    onError: err => {
      const message = err?.response?.data?.message || "修改失败，请重试";
      toast.error(message);
    },
  });

  return mutation;
}
