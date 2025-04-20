import styled from "styled-components";

const StyledCarouselInner = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ cardindex }) => `translateX(-${cardindex * 100}%)`};
`;

function CarouselInner({ children, cardIndex }) {
  return (
    <StyledCarouselInner cardindex={cardIndex}>{children}</StyledCarouselInner>
  );
}

export default CarouselInner;
