import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.6rem;
`;

function RoutesDetail() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default RoutesDetail;
