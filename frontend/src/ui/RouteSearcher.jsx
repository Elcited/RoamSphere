import styled from "styled-components";
import RoutesSearchInputs from "./RoutesSearchInputs";

const Container = styled.div`
  padding: 0.9rem;
`;

function RouteSearcher() {
  return (
    <Container>
      <RoutesSearchInputs />
    </Container>
  );
}

export default RouteSearcher;
