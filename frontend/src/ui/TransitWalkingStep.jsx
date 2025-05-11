import React, { useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";

const DOT_SPACING = 24; // 点之间的理想间距

const BoxContainer = styled.div`
  display: flex;
  padding: 1rem 0;
  background: #fff;
`;

const LeftTextBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  cursor: pointer;
  color: #333;
`;

const RightBox = styled.div`
  flex: 3;
  display: flex;
  margin-left: 1.9rem;
`;

const DotColumn = styled.div`
  width: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 均匀分布 */
  transition: height 0.3s ease;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #1976d2;
  border-radius: 50%;
`;

const ContentColumn = styled.div`
  flex: 1;
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.2s ease 0.1s;
  opacity: ${({ expanded }) => (expanded ? 1 : 1)};
  max-height: ${({ expanded, totalHeight }) =>
    expanded ? `${totalHeight}px` : `${totalHeight}px`};
`;

const Header = styled.div`
  cursor: pointer;
  user-select: none;
`;

const LabelBox = styled.h2`
  margin: 0;
  font-weight: 600;
  color: #333;
`;

const TimeDistanceBox = styled.div`
  font-size: 1.6rem;
  color: #333;
`;

const ExpandableContent = styled.div`
  overflow: hidden;
  transition: height 0.3s ease, opacity 0.2s ease 0.1s;
  opacity: ${({ expanded }) => (expanded ? 1 : 0)};
  height: ${({ expanded, contentHeight }) =>
    expanded ? `${contentHeight}px` : "0px"};
`;

const StepItem = styled.div`
  padding: 8px 0;
  font-size: 1.2rem;
  color: #555;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

export default function TransitWalkingStep({
  duration,
  distance,
  instructions = [],
}) {
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  const [expanded, setExpanded] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  // 每次展开/收起 或 instructions 变化时测量高度
  useLayoutEffect(() => {
    const hH = headerRef.current?.offsetHeight || 0;
    const cH = contentRef.current?.scrollHeight || 0;
    setHeaderHeight(hH);
    setContentHeight(cH);
  }, [expanded, instructions]);

  const toggle = () => setExpanded(v => !v);

  // 整个内容区总高度 = headerHeight + (expanded ? contentHeight : 0)
  const totalHeight = headerHeight + (expanded ? contentHeight : 0);

  // 计算需要多少个点
  const dotCount = Math.max(1, Math.ceil(totalHeight / DOT_SPACING));

  return (
    <BoxContainer>
      <LeftTextBox onClick={toggle}>
        <DirectionsWalkIcon fontSize="large" />
      </LeftTextBox>

      <RightBox>
        {/* 左侧点列 */}
        <DotColumn style={{ height: totalHeight }}>
          {Array.from({ length: dotCount }).map((_, i) => (
            <Dot key={i} />
          ))}
        </DotColumn>

        {/* 右侧文字区 */}
        <ContentColumn expanded={expanded} totalHeight={totalHeight}>
          <Header ref={headerRef} onClick={toggle}>
            <LabelBox>步行</LabelBox>
            <TimeDistanceBox>
              大约 {duration} · {distance}
            </TimeDistanceBox>
          </Header>

          <ExpandableContent expanded={expanded} contentHeight={contentHeight}>
            <div ref={contentRef}>
              {instructions.map((txt, idx) => (
                <StepItem key={idx}>{txt}</StepItem>
              ))}
            </div>
          </ExpandableContent>
        </ContentColumn>
      </RightBox>
    </BoxContainer>
  );
}
