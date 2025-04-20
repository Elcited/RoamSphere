import styled from "styled-components";
import ReactECharts from "echarts-for-react";
import { useRef } from "react";

const HeatMapContainer = styled.div`
  padding: 4.8rem 0 9.6rem 0;
  margin: 0 auto;
`;

const ChartsBox = styled.div`
  padding: 2.4rem;
`;

const option = {
  dataset: {
    source: [
      ["score", "amount", "product"],
      [89.3, 58212, "Matcha Latte"],
      [57.1, 78254, "Milk Tea"],
      [74.4, 41032, "Cheese Cocoa"],
      [50.1, 12755, "Cheese Brownie"],
      [89.7, 20145, "Matcha Cocoa"],
      [68.1, 79146, "Tea"],
      [19.6, 91852, "Orange Juice"],
      [10.6, 101852, "Lemon Juice"],
      [32.7, 20112, "Walnut Brownie"],
    ],
  },
  xAxis: {},
  yAxis: { type: "category" },
  series: [
    {
      type: "bar",
      encode: {
        x: "amount",
        y: "product",
      },
    },
  ],
};

function HeatMap() {
  const chartRef = useRef(null);

  return (
    <HeatMapContainer>
      <ChartsBox>
        <ReactECharts ref={chartRef} option={option} />
      </ChartsBox>
    </HeatMapContainer>
  );
}

export default HeatMap;
