import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PlaceDetailPanelImage from "./PlaceDetailPanelImage";
import PlaceDetailPanelBodyHeader from "./PlaceDetailPanelBodyHeader";
import PlaceDetailOverviewSection from "./PlaceDetailOverviewSection";
import PlaceDetailsSection from "./PlaceDetailsSection";
import PlaceDetailCommentsSections from "./PlaceDetailCommentSecton";
import useSelectedPlaceDetail from "../features/search/useSelectedPlaceDetail";
import { useFavorites } from "../hooks/useFavorite";

const PanelWrapper = styled.div`
  position: absolute;
  top: 12rem;
  left: 50rem;
  width: 35rem;
  max-height: 52rem;
  border-radius: 2.4rem;
  background-color: #fff;
  box-shadow: 0 5px 20px 5px rgba(0, 0, 0, 0.1);
  z-index: 10000;
  font-family: "Google Sans", Roboto, "Noto Sans SC", Arial, sans-serif;
  overflow-y: auto;

  /* 自定义滚动条样式（Webkit 浏览器） */
  &::-webkit-scrollbar {
    width: 6px; /* 更细的宽度 */
  }

  &::-webkit-scrollbar-track {
    background: transparent; /* 去掉灰底让滚动条更贴边、轻盈 */
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(180, 180, 180, 0.3); /* 稍深一点，提升可见性 */
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(120, 120, 120, 0.5);
  }

  /* Firefox 支持 */
  scrollbar-width: thin;
  scrollbar-color: rgba(180, 180, 180, 0.3) transparent;
`;

const PanelHeader = styled.div`
  font-size: 1.2rem;
`;

const PanelBody = styled.div`
  color: #555;
`;

const TabsWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  background: #fafafa;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 1rem 0;
  font-size: 1.4rem;
  background-color: #fff;
  border: none;
  border-bottom: 2px solid transparent;
  color: #555;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid #1976d2;
    color: #1976d2;
    font-weight: bold;
  `}
`;

const TabContentArea = styled.div`
  max-height: 50vh;
  scroll-behavior: smooth;
`;

function PlaceDetailPanel() {
  const { isPlaceDetailPanelVisible } = useSelector(store => store.search);
  const [activeTab, setActiveTab] = useState("overview");

  const overviewRef = useRef(null);
  const detailsRef = useRef(null);
  const commentsRef = useRef(null);

  const scrollTo = ref => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!isPlaceDetailPanelVisible) return null;

  return (
    <PanelWrapper>
      <PanelHeader>
        <PlaceDetailPanelImage />
      </PanelHeader>

      <PanelBody>
        <PlaceDetailPanelBodyHeader />

        <TabsWrapper>
          <TabButton
            active={activeTab === "overview"}
            onClick={() => {
              scrollTo(overviewRef);
              setActiveTab("overview");
            }}
          >
            概览
          </TabButton>
          <TabButton
            active={activeTab === "details"}
            onClick={() => {
              scrollTo(detailsRef);
              setActiveTab("details");
            }}
          >
            详情
          </TabButton>
          <TabButton
            active={activeTab === "comments"}
            onClick={() => {
              scrollTo(commentsRef);
              setActiveTab("comments");
            }}
          >
            评论
          </TabButton>
        </TabsWrapper>

        <TabContentArea>
          <PlaceDetailOverviewSection ref={overviewRef} />
          <PlaceDetailsSection ref={detailsRef} />
          <PlaceDetailCommentsSections ref={commentsRef} />
        </TabContentArea>
      </PanelBody>
    </PanelWrapper>
  );
}

export default PlaceDetailPanel;
