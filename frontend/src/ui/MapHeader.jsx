import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setMapMode } from "../features/map/mapSlice";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
  font-size: 1.8rem;
  min-width: 100vw;
  padding: 1.2rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  padding: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.4rem;
`;

const TagsBox = styled.div`
  display: flex;
  gap: 4.8rem;
`;

const Tag = styled.div`
  display: inline-block;
  position: relative;
  cursor: pointer;
  padding-bottom: 2px;

  &:hover::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #000;
    transition: width 0.3s ease;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #000;
    transition: width 0.3s ease;
  }
`;

const OptionBox = styled.div`
  display: flex;
  gap: 2.4rem;
`;

const MapInputs = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const Inputs = styled.input`
  width: 20rem;
  height: 4.5rem;
  border-radius: 0.5rem;
  background-color: #f7f7f7;
`;

const SwitchButton = styled.button`
  width: 4.5rem;
  height: 4.5rem;
  background-color: #f7f7f7;
`;

function MapHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitchMode = mode => {
    dispatch(setMapMode(mode));
    navigate(`/map/${mode}`);
  };

  return (
    <HeaderContainer>
      <Container>
        <TagsBox>
          <Tag onClick={() => handleSwitchMode("routes")}>交通</Tag>
          <Tag onClick={() => handleSwitchMode("attractions")}>景点</Tag>
          <Tag onClick={() => handleSwitchMode("hotels")}>酒店</Tag>
          <Tag onClick={() => handleSwitchMode("custom")}>自定义路径</Tag>
        </TagsBox>
        <OptionBox>
          <p>切换语言</p>
          <p>个人中心</p>
        </OptionBox>
      </Container>
      <Container>
        <MapInputs>
          <Inputs type="text" />
          <SwitchButton>⇅</SwitchButton>
          <Inputs type="text" />
        </MapInputs>
      </Container>
    </HeaderContainer>
  );
}

export default MapHeader;
