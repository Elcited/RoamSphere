import styled from "styled-components";

const Routes = styled.div`
  max-width: 100%;
  height: 100px;
  font-size: 1.2rem;
  padding: 1.2rem;
  border-radius: 1.2rem;
  background-color: #fff;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 1.2rem;
  column-gap: 2.4rem;
  letter-spacing: 1.2px;
`;

const RouteText = styled.p`
  font-size: 1.6rem;
  letter-spacing: 0;
`;

function RoutesRow({ route, onClick }) {
  return (
    <Routes onClick={onClick}>
      <RouteText>🚗 路线总长：{route.distance} 米</RouteText>
      <RouteText>⏳ 预计时间：{Math.round(route.time / 60)} 分钟</RouteText>
      <RouteText>{route.label}</RouteText>
    </Routes>
  );
}

export default RoutesRow;
