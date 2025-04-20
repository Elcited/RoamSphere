import styled from "styled-components";

const GridBox = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  gap: 2.4rem;
  padding: 4.8rem;
  margin: 0 auto;
`;

function FooterGridBox({ children }) {
  return <GridBox>{children}</GridBox>;
}

export default FooterGridBox;
