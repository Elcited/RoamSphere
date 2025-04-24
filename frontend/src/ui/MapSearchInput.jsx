import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import useAMapLoader from "../hooks/useAMapLoader";
import useQueryUpdater from "../hooks/useQueryUpdater";
import { useDispatch } from "react-redux";
import {
  setPositionCenterLocation,
  setPositionKeyWord,
  setPositionRegion,
  setPositionType,
} from "../features/positions/positionSlice";
import { setMapMode } from "../features/map/mapSlice";

const InputBox = styled.div`
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
  z-index: 20;
  padding: 0;
`;

const IconButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

function MapSearchInput() {
  const [region, setRegion] = useState("");
  const inputRef = useRef(null);
  const { data: AMap, isSuccess, isLoading } = useAMapLoader();
  const dispatch = useDispatch();
  const { updateQueryAndNavigate } = useQueryUpdater();

  const handleSearch = () => {
    if (!inputRef.current) return;
    const inputValue = inputRef.current.value;
    if (inputValue) {
      console.log("Searching for:", inputValue);
      dispatch(setPositionCenterLocation(null));
      dispatch(setPositionKeyWord(inputValue));
      dispatch(setPositionRegion(region));
      dispatch(setPositionType(null));
      dispatch(setMapMode("position"));

      updateQueryAndNavigate(
        {
          startLocation: null,
          endLocation: null,
          mapMode: "position",
          positionKeyWord: inputValue,
        },
        "/map/positions",
        {
          replace: true,
        }
      );
    }
  };

  const handleChange = e => {
    setRegion(e.target.value);
  };

  useEffect(() => {
    if (!isSuccess || !AMap || !inputRef.current) return;

    AMap.plugin("AMap.AutoComplete", () => {
      new AMap.AutoComplete({
        input: inputRef.current,
      });
    });
  }, [isSuccess, AMap]);

  if (isLoading) return <div>Loading...</div>;
  if (!isSuccess) return <div>Failed to load AMap</div>;

  return (
    <InputBox>
      <TextField
        inputRef={inputRef}
        id="outlined-basic"
        label="搜索 RoamSphere"
        variant="outlined"
        size="small"
        fullWidth
        sx={{
          backgroundColor: "white",
          width: "362px",
          height: "50px",
          borderRadius: "10px",
          fontSize: "16px",
        }}
      />
      <IconButtonBox>
        <IconButton onClick={handleSearch}>
          <SearchIcon fontSize="large" />
        </IconButton>
        <IconButton>
          <CloseIcon fontSize="large" />
        </IconButton>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={region}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="全国">
              <em>全国</em>
            </MenuItem>
            <MenuItem value="北京">北京</MenuItem>
            <MenuItem value="深圳">深圳</MenuItem>
            <MenuItem value="上海">上海</MenuItem>
          </Select>
          <FormHelperText>Without label</FormHelperText>
        </FormControl>
      </IconButtonBox>
    </InputBox>
  );
}

export default MapSearchInput;
