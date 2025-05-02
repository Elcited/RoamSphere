import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import RoutesDisplayItem from "./RoutesDisplayItem";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

function RoutesDisplay() {
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();
  const { travelMode } = useSelector(store => store.route);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  useEffect(() => {}, []);

  return (
    <Container>
      <RoutesDisplayItem isSelected={isSelected} handleClick={handleClick} />
      <RoutesDisplayItem />
      <RoutesDisplayItem />
    </Container>
  );
}

export default RoutesDisplay;
