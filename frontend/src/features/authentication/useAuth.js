import useGetCurrentUser from "./useGetCurrentUser";

export default function useAuth() {
  const { userData, isSuccess, isLoading } = useGetCurrentUser();
  return {
    userData,
    isAuthenticated: !!userData,
    isSuccess,
    isLoading,
  };
}
