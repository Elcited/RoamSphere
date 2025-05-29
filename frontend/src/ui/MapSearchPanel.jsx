import styled from "styled-components";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

const PanelWrapper = styled.div`
  position: absolute;
  left: 7.2rem;
  width: 40rem;
  min-height: 100vh;
  background-color: white;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
  z-index: 999;
  max-height: calc(100vh - 3.2rem);

  overflow-y: auto;

  /* 自定义滚动条样式（Webkit 浏览器） */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f0f0f0;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(4px);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(200, 200, 200, 0.5);
  }

  /* Firefox 支持 */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) #f0f0f0;
`;

const SearchResultBox = styled.div`
  margin-top: ${({ pathname }) =>
    pathname.includes("routes") ? "" : "6.5rem"};
`;

function MapSearchPanel() {
  const { isSearchPanelExpanded } = useSelector(store => store.search);
  const location = useLocation();
  const pathname = location.pathname;

  if (!isSearchPanelExpanded) return null;

  return (
    <PanelWrapper>
      {isSearchPanelExpanded && (
        <SearchResultBox pathname={pathname}>
          <Outlet />
        </SearchResultBox>
      )}
    </PanelWrapper>
  );
}

export default MapSearchPanel;
