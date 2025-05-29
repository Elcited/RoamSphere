import styled from "styled-components";
import { Avatar } from "@mui/material";
import useAuth from "../features/authentication/useAuth";
import { useBrowsedData } from "../hooks/useBrowsedData";
import { CircularProgress } from "@mui/material";

const OverviewWrapper = styled.section`
  width: 100%;
  height: 100%;
  color: #555;
  font-size: 1.4rem;
`;

const OverviewHeader = styled.div`
  padding: 0.6rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  border-bottom: 1px solid #eee;
`;

const AvatarBox = styled.div`
  position: relative;
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  overflow: hidden;
`;

const TextLine = styled.div`
  letter-spacing: 1.2px;
  font-size: 2.4rem;
  color: #333;
  padding: 0.3rem;
  padding-bottom: 1.2rem;
`;

const OverviewBody = styled.div`
  padding: 0.6rem;
`;

const DataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: start;
  column-gap: 1.2rem;
  row-gap: 2.4rem;
`;

const DataGridItem = styled.div`
  width: 100%;
  height: 280px; /* 固定高度，可根据你实际需求调 */
  padding: 1.2rem;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 2.4rem;

  overflow-y: auto; /* 超出时启用竖向滚动 */

  /* 滚动条美化 - webkit内核浏览器 */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #bbb;
    border-radius: 10px;
    border: 2px solid #f0f0f0;
  }

  /* Firefox滚动条样式 */
  scrollbar-width: thin;
  scrollbar-color: #bbb #f0f0f0;
`;

const GridItemTitle = styled.h2`
  color: #333;
`;

const StaticList = styled.div`
  padding-top: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const StaticListItem = styled.div`
  padding: 0.3rem;
`;

const GridItemTextLine = styled.div`
  font-size: 1.2rem;
  color: #555;
`;

function UserCenterOverview() {
  const { userData } = useAuth();
  const { data: userDataDetail } = userData || {};
  const { user } = userDataDetail || {};
  const { data: browsedData, isLoading } = useBrowsedData();

  return (
    <OverviewWrapper>
      <OverviewHeader>
        <AvatarBox>
          <Avatar
            src={""}
            alt={"user avatar"}
            sx={{ width: "120px", height: "120px" }}
          >
            User
          </Avatar>
        </AvatarBox>
        <TextLine>欢迎使用，{user?.name}</TextLine>
      </OverviewHeader>

      <OverviewBody>
        <TextLine>{user?.name}，您最近去过</TextLine>
        <DataGrid>
          <DataGridItem>
            <GridItemTitle>景点</GridItemTitle>
            <StaticList>
              {isLoading ? (
                <CircularProgress />
              ) : browsedData?.attractions?.length ? (
                browsedData.attractions.slice(0, 10).map(item => (
                  <StaticListItem key={item._id}>
                    <GridItemTextLine>{item.name}</GridItemTextLine>
                  </StaticListItem>
                ))
              ) : (
                <StaticListItem>
                  <GridItemTextLine>暂无数据</GridItemTextLine>
                </StaticListItem>
              )}
            </StaticList>
          </DataGridItem>

          <DataGridItem>
            <GridItemTitle>酒店</GridItemTitle>
            <StaticList>
              {isLoading ? (
                <CircularProgress />
              ) : browsedData?.hotels?.length ? (
                browsedData.hotels.slice(0, 10).map(item => (
                  <StaticListItem key={item._id}>
                    <GridItemTextLine>{item.name}</GridItemTextLine>
                  </StaticListItem>
                ))
              ) : (
                <StaticListItem>
                  <GridItemTextLine>暂无数据</GridItemTextLine>
                </StaticListItem>
              )}
            </StaticList>
          </DataGridItem>

          <DataGridItem style={{ gridColumn: "1/-1" }}>
            <GridItemTitle>城市</GridItemTitle>
            <StaticList>
              {isLoading ? (
                <CircularProgress />
              ) : browsedData?.cities?.length ? (
                browsedData.cities.slice(0, 10).map((city, index) => (
                  <StaticListItem key={index}>
                    <GridItemTextLine>{city}</GridItemTextLine>
                  </StaticListItem>
                ))
              ) : (
                <StaticListItem>
                  <GridItemTextLine>暂无数据</GridItemTextLine>
                </StaticListItem>
              )}
            </StaticList>
          </DataGridItem>
        </DataGrid>
      </OverviewBody>
    </OverviewWrapper>
  );
}

export default UserCenterOverview;
