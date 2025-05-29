import styled from "styled-components";
import SearchedOtherPOIChart from "./SearchedOtherPOIChart ";
import ViewedAttractionChart from "./ViewedAttractionChart ";

const HeatMapContainer = styled.div`
  padding: 4.8rem 0 9.6rem 0;
  margin: 10rem auto;
`;

const ChartsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.4rem;
`;

const ChartItem = styled.div`
  flex: 1;
  padding: 3.6rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  align-items: center;
`;

function HeatMap() {
  return (
    <HeatMapContainer>
      <ChartsBox>
        <ChartItem>
          <ViewedAttractionChart />
        </ChartItem>
        <ChartItem>
          <SearchedOtherPOIChart />
        </ChartItem>
      </ChartsBox>
    </HeatMapContainer>
  );
}

export default HeatMap;
