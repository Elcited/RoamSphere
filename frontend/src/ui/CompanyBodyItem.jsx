import styled from "styled-components";

const BodyItem = styled.div`
  font-size: 1.6rem;
  cursor: pointer;
`;

function CompanyBodyItem({ content, handler }) {
  return <BodyItem onClick={handler}>{content}</BodyItem>;
}

export default CompanyBodyItem;
