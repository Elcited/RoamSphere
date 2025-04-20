import styled from "styled-components";
import TextField from "@mui/material/TextField";

const InputBox = styled.div`
  position: absolute;
  top: 0.75rem;
  left: 8rem;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
  z-index: 20;
  padding: 0;
`;

function MapSearchInput() {
  return (
    <InputBox>
      <TextField
        id="outlined-basic"
        label="搜索 RoamSphere "
        variant="outlined"
        size="larger"
        fullWidth
        sx={{
          backgroundColor: "white",
          width: "362px",
          height: "50px",
          borderRadius: "10px",
          fontSize: "16px",
        }}
      />
    </InputBox>
  );
}

export default MapSearchInput;
