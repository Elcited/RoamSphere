import styled from "styled-components";

const TimeGroup = styled.div`
  color: #fff;
  cursor: pointer;
`;

const TimeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.6rem;
  background-color: ${({ color, index, selectedIndex }) =>
    index === selectedIndex ? color : "#ccc"};
`;

const Line = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: center;
`;

function TransitTimeRangeInfo({
  time,
  index,
  color,
  selectedIndex,
  setSelectedIndex,
}) {
  const { timeRange, departure, arrival, fullText } = time;

  const handleClick = index => {
    setSelectedIndex(index);
  };

  return (
    <TimeGroup onClick={() => handleClick(index)}>
      <TimeList color={color} index={index} selectedIndex={selectedIndex}>
        <Line>{timeRange}</Line>
      </TimeList>
    </TimeGroup>
  );
}

export default TransitTimeRangeInfo;
