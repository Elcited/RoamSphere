import styled from "styled-components";

const AnchorContainer = styled.div`
  width: 100%;
`;

const StyledAnchor = styled.a`
  color: #072126;
  display: inline-block;
  font-size: 9.6rem;
  line-height: 0.96;
  text-decoration: none;
  position: relative;

  &:hover span:nth-child(1)::after {
    transform: scaleX(1);
    transform-origin: 0 50%;
    transition-delay: 0s;
  }

  &:hover span:nth-child(2)::after {
    transform: scaleX(1);
    transform-origin: 0 50%;
    transition-delay: 0.5s;
  }
`;

const SpanLine = styled.span`
  display: block;
  position: relative;
  margin-bottom: 1.2rem;
  width: fit-content;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 0.5rem;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: 100% 50%;
    transition: transform 0.6s cubic-bezier(0.86, 0, 0.07, 1);
    will-change: transform;
  }
`;

const SpanEmailWords = styled.span`
  padding: 1.2rem;
`;

function EmailRow() {
  return (
    <AnchorContainer>
      <StyledAnchor href="#">
        <SpanLine>
          <SpanEmailWords>hello@</SpanEmailWords>
        </SpanLine>
        <SpanLine>
          <SpanEmailWords>RoamShpere.com</SpanEmailWords>
        </SpanLine>
      </StyledAnchor>
    </AnchorContainer>
  );
}

export default EmailRow;
