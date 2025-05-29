import styled from "styled-components";

const BodyItem = styled.div`
  font-size: 1.6rem;
  cursor: pointer;
`;

function ResourceBodyItem({ content, handler }) {
  return <BodyItem onClick={handler}>{content}</BodyItem>;
}

export default ResourceBodyItem;
