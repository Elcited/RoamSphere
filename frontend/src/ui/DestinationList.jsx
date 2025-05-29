import styled from "styled-components";
import DestinationListItem from "./DestinationListItem";
import { getCityImage } from "../utils/getCityImage";

const DestinationListContainer = styled.section`
  padding: 4.8rem 0 9.6rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin: 4.8rem 0;
  position: relative;
`;

const DestinationListHeader = styled.h2`
  font-weight: 500;
  text-align: center;
  letter-spacing: 1.2rem;
`;

const DestinationListBox = styled.div`
  padding: 2.4rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  justify-items: center;
  gap: 1.2rem;
`;

const cities = [
  { name: "北京", fileName: "beijing" },
  { name: "上海", fileName: "shanghai" },
  { name: "广州", fileName: "guangzhou" },
  { name: "深圳", fileName: "shenzhen" },
  { name: "长沙", fileName: "changsha" },
  { name: "天津", fileName: "tianjin" },
  { name: "郑州", fileName: "zhengzhou" },
  { name: "武汉", fileName: "wuhan" },
];

function DestinationList() {
  return (
    <DestinationListContainer id="DestinationList">
      <DestinationListHeader>探索以下热门城市</DestinationListHeader>
      <DestinationListBox>
        {cities.map((city, index) => (
          <DestinationListItem
            img={getCityImage(city.fileName)}
            name={city.name}
            key={index}
          />
        ))}
      </DestinationListBox>
    </DestinationListContainer>
  );
}

export default DestinationList;
