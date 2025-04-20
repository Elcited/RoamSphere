import styled from "styled-components";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const HeaderText = styled.div`
  display: flex;
  gap: 1.2rem;
  letter-spacing: 2px;
  font-size: 2.4rem;
`;

function RoutesDetailHeader() {
  const { info } = useSelector(store => store.routeDetail);

  if (!info) return;

  return (
    <Container>
      <HeaderText>
        <TextField
          id="standard-basic"
          variant="standard"
          size="large"
          value={info.startLocation.name}
          sx={{
            backgroundColor: "white",
            width: "150px",
            height: "50px",
            borderRadius: "10px",
          }}
        />
        <TextField
          id="standard-basic"
          variant="standard"
          size="large"
          value={info.endLocation.name}
          sx={{
            backgroundColor: "white",
            width: "150px",
            height: "50px",
            borderRadius: "10px",
          }}
        />
      </HeaderText>
    </Container>
  );
}

export default RoutesDetailHeader;
