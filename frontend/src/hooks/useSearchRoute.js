import { useSearchParams } from "react-router-dom";

export default function useSearchRoute() {
  const [searchParams] = useSearchParams();
  const start = searchParams.get("startPoint");
  const end = searchParams.get("endPoint");
}
