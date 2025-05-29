import styled from "styled-components";

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

function PlaceDetailPanelTabs() {
  return (
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
  );
}

export default PlaceDetailPanelTabs;
