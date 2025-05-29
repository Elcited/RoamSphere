import styled from "styled-components";
import FavoriteList from "./FavoriteList";
import { useFavorites } from "../hooks/useFavorite";
import FavoriteTrendChart from "./FavoriteTrendChart";

const UserCenterDataPrivacyWrapper = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1.4rem;
  color: #555;
`;

const DataPrivacyHeader = styled.div`
  padding: 0.6rem;
  letter-spacing: 1.2px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DataPrivacyTitle = styled.h1`
  font-size: 2.4rem;
  color: #333;
`;

const DataPrivacyDescription = styled.div`
  font-size: 1.4rem;
`;

const DataPrivacyBody = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50rem;
`;

const DataPrivacyBodyTopBox = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  align-items: start;
`;

const DataPrivacyBodyTopTextBox = styled.div`
  padding: 0.6rem;
`;

const DataPrivacyBodyTitle = styled.div`
  font-size: 2.4rem;
  padding: 0.3rem;
  color: #333;
`;

const DataPrivacyBodyText = styled.div`
  font-size: 1.4rem;
  padding: 0.3rem;
  color: #555;
`;

const DataBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.2rem;
  padding: 0.3rem;
`;

const FavoriteListBox = styled.div`
  padding: 1.2rem;
  flex: 1;
  padding: 1.2rem;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 8px;
`;

const ChartBox = styled.div`
  padding: 1.2rem;
  flex: 1;
  padding: 1.2rem;
  border: 1px solid #eee;
  border-radius: 8px;
  display: flex;
  align-items: center;
`;

function UserCenterDataPrivacy() {
  const { data: favoritesList } = useFavorites();
  return (
    <UserCenterDataPrivacyWrapper>
      <DataPrivacyHeader>
        <DataPrivacyTitle>数据与隐私设置</DataPrivacyTitle>
        <DataPrivacyDescription>
          重要的隐私选项，可帮助您选择保存到您账号中的数据、我们向您展示的广告、您与他人共享的信息等等
        </DataPrivacyDescription>
      </DataPrivacyHeader>

      <DataPrivacyBody>
        <DataPrivacyBodyTopBox>
          <DataPrivacyBodyTopTextBox>
            <DataPrivacyBodyTitle>用户收藏数据展示</DataPrivacyBodyTitle>
            <DataPrivacyBodyText>
              您可以在此查看近期的收藏行为与数据，同时管理您的收藏数据
            </DataPrivacyBodyText>
          </DataPrivacyBodyTopTextBox>
        </DataPrivacyBodyTopBox>

        <DataBox>
          <FavoriteListBox>
            <FavoriteList data={favoritesList} />
          </FavoriteListBox>

          <ChartBox>
            <FavoriteTrendChart />
          </ChartBox>
        </DataBox>
      </DataPrivacyBody>
    </UserCenterDataPrivacyWrapper>
  );
}

export default UserCenterDataPrivacy;
