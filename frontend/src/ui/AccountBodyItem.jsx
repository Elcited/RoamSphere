import styled from "styled-components";

const BodyItem = styled.div`
  font-size: 1.6rem;
`;

function AccountBodyItem({ content }) {
  return <BodyItem>{content}</BodyItem>;
}

export default AccountBodyItem;
