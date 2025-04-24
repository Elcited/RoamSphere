import styled from "styled-components";
import DestinationListItem from "./DestinationListItem";
import { useEffect, useState } from "react";

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

function DestinationList() {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const images = import.meta.glob("../assets/images/tours/*.{png,jpg}");

    const loadImages = async () => {
      const imgArray = await Promise.all(
        Object.values(images).map(importFn =>
          importFn().then(mod => mod.default)
        )
      );
      setImageList(imgArray);
    };

    loadImages();
  }, []);

  return (
    <DestinationListContainer id="DestinationList">
      <DestinationListHeader>探索热门城市的景点</DestinationListHeader>
      <DestinationListBox>
        {imageList.map((src, index) => (
          <DestinationListItem img={src} key={index} />
        ))}
      </DestinationListBox>
    </DestinationListContainer>
  );
}

export default DestinationList;
