import styled from "styled-components";

const StyledCarouselContainer = styled.div`
  max-width: 80rem;
  /* overflow: hidden; */
  padding: 1.2rem;
  margin: 0 auto;
  position: relative;
`;

function CarouselContainer({ children }) {
  return <StyledCarouselContainer>{children}</StyledCarouselContainer>;
}

export default CarouselContainer;
