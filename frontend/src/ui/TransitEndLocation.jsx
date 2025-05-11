import { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import formatReadableAddress from "../utils/formatReadableAddress";
import waypoint_end from "../assets/images/transit/waypoint_end.png";

const DOT_SPACING = 24;

const BoxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
`;

const LeftTextBox = styled.div`
  flex: 1;
  font-size: 1.2rem;
  color: #333;
  display: flex;
  justify-content: center;
`;

const RightBox = styled.div`
  flex: 3;
  display: flex;
  gap: 1rem;
  color: #444;
`;

const ImageBox = styled.div`
  width: 16px;
  height: 16px;
  background-image: url(${waypoint_end});
  background-size: contain;
  background-repeat: no-repeat;
`;

const DotColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #1976d2;
  border-radius: 50%;
`;

const DotContentBox = styled.div`
  display: flex;
  flex-direction: column;
  color: #ddd;
`;

const StyledHeader = styled.h2`
  color: #444;
`;

const Address = styled.div`
  color: #bbb;
`;

function TransitEndLocation({ location, info }) {
  const contentRef = useRef(null);
  const [dotCount, setDotCount] = useState(0);

  const address = formatReadableAddress(info);

  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      const height = entries[0].contentRect.height;
      const count = Math.max(1, Math.floor(height / DOT_SPACING));

      setDotCount(prev => (prev !== count ? count : prev));
    });

    resizeObserver.observe(contentRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <BoxContainer>
      <LeftTextBox>
        <h3>终点</h3>
      </LeftTextBox>

      <RightBox>
        <DotColumn
          style={{ height: contentRef.current?.offsetHeight || "auto" }}
        >
          {Array.from({ length: dotCount }).map((_, idx) => (
            <Dot key={idx} />
          ))}
          <ImageBox />
        </DotColumn>

        <DotContentBox ref={contentRef}>
          <StyledHeader>{location.name}</StyledHeader>
          <Address>{address}</Address>
        </DotContentBox>
      </RightBox>
    </BoxContainer>
  );
}

export default TransitEndLocation;
