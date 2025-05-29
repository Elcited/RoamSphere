import styled from "styled-components";

const UserCenterPaySubscribeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TipsLine = styled.div`
  padding: 0.6rem;
  font-size: 2.4rem;
  color: #333;
`;

function UserCenterPaySubscribe() {
  return (
    <UserCenterPaySubscribeWrapper>
      <TipsLine>当前功能开发中</TipsLine>
    </UserCenterPaySubscribeWrapper>
  );
}

export default UserCenterPaySubscribe;
