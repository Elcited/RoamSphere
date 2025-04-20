import styled from "styled-components";

const BodyItem = styled.div`
  font-size: 1.6rem;
`;

function ResourceBodyItem({ content }) {
  return <BodyItem>{content}</BodyItem>;
}

export default ResourceBodyItem;
