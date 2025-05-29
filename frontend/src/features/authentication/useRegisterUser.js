import { useMutation } from "@tanstack/react-query";
import useQueryUpdater from "../../hooks/useQueryUpdater";

export default function useRegisterUser() {
  const { updateQueryAndNavigate } = useQueryUpdater();

  return useMutation({
    mutationFn: async userData => {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "注册失败");
      }

      return response.json();
    },
    onSuccess(response) {
      console.log(response);
      updateQueryAndNavigate({}, "/login", {
        clearOthers: true,
      });
    },
  });
}
