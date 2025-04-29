import styled from "styled-components";
import AccountBodyItem from "./AccountBodyItem";

const StyledColumn = styled.div`
  font-size: 1.2rem;
  display: flex;
  gap: 2.4rem;
  justify-content: start;
  align-items: start;
`;

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  padding: 0 1.2rem 0;
`;

const AccountBody = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  row-gap: 1.6rem;
  column-gap: 4.8rem;
  justify-items: center;
  align-items: start;
`;

const items = [
  { id: 1, content: "注册" },
  { id: 2, content: "登录" },
  { id: 3, content: "个人中心" },
  { id: 4, content: "注销" },
];

function AccountColumn() {
  return (
    <StyledColumn>
      <Title>账号</Title>
      <AccountBody>
        {items.map(item => (
          <AccountBodyItem content={item.content} key={item.id} />
        ))}
      </AccountBody>
    </StyledColumn>
  );
}

export default AccountColumn;
