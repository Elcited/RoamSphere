import styled from "styled-components";
import MapSearchInput from "./MapSearchInput";
import { useLocation } from "react-router-dom";

const SearchBarWrapper = styled.div`
  position: absolute;
  top: 0.6rem;
  left: 9rem;
  z-index: 1000;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: "1px solid #ccc";
  border-radius: "24px";
`;

export default function MapSearchBar() {
  const location = useLocation();
  const pathname = location.pathname;
  const isRoute = pathname.includes("routes");

  return (
    <SearchBarWrapper>
      {/* 控制是否展示输入框：在 route 路由下，输入框全程隐藏 */}
      {!isRoute && <MapSearchInput />}
    </SearchBarWrapper>
  );
}
