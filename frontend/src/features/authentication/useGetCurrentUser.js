import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "./userSlice";
import { useEffect } from "react";

export default function useGetCurrentUser() {
  const dispatch = useDispatch();

  const {
    data: userData,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await fetch("/api/users/me", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("获取用户信息失败");
      }

      return res.json();
    },
    staleTime: 1000 * 60 * 5, // 缓存5分钟内不会自动请求
    refetchOnMount: false, // 防止一挂载就打接口，节省资源
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (userData) {
      dispatch(loginSuccess(userData));
    }
  }, [userData, dispatch]);

  return { userData, isSuccess, isLoading };
}
