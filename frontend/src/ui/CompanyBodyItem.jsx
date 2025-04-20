import styled from "styled-components";

const BodyItem = styled.div`
  font-size: 1.6rem;
`;

function CompanyBodyItem({ content }) {
  return <BodyItem>{content}</BodyItem>;
}

export default CompanyBodyItem;
