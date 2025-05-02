import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import useAMapLoader from "../hooks/useAMapLoader";
import useQueryUpdater from "../hooks/useQueryUpdater";
import {
  setPositionCenterLocation,
  setPositionKeyWord,
  setPositionRegion,
  setPositionType,
} from "../features/positions/positionSlice";
import { setMapMode } from "../features/map/mapSlice";
import { setIsRouteRendered } from "../features/routeDetail/routeSlice";

const InputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
`;

function MapSearchInput() {
  const [region, setRegion] = useState("");
  const inputRef = useRef(null);
  const { data: AMap, isSuccess, isLoading } = useAMapLoader();
  const dispatch = useDispatch();
  const { updateQueryAndNavigate } = useQueryUpdater();

  const sharedInputStyles = {
    height: "44px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "8px 12px",
    fontSize: "1rem",
    backgroundColor: "#fff",
    boxSizing: "border-box",
    "&::placeholder": {
      color: "#999",
      fontSize: "1rem",
    },
  };

  const handleSearch = () => {
    if (!inputRef.current) return;
    const inputValue = inputRef.current.value;
    if (inputValue) {
      console.log("Searching for:", inputValue);
      dispatch(setIsRouteRendered(false));
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

  const handleCleanInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setRegion("");
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
      <Autocomplete
        freeSolo
        options={["全国", "北京", "深圳", "上海"]}
        value={region}
        onChange={(event, newValue) => {
          setRegion(newValue || "");
        }}
        onInputChange={(event, newInputValue) => {
          setRegion(newInputValue);
        }}
        renderInput={params => (
          <InputBase
            {...params.InputProps}
            placeholder="选择区域"
            sx={{
              ...sharedInputStyles,
            }}
            inputProps={{
              ...params.inputProps,
              "aria-label": "选择区域",
            }}
          />
        )}
        sx={{
          maxWidth: 120,
          "& .MuiInputBase-root": {
            height: "44px",
          },
          margin: 0,
          padding: 0,
        }}
      />
      <InputBase
        inputRef={inputRef}
        placeholder="搜索 RoamSphere"
        fullWidth
        sx={{
          ...sharedInputStyles,
        }}
        endAdornment={
          <InputAdornment position="end" sx={{ ml: 1 }}>
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
            <IconButton onClick={handleCleanInput}>
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </InputBox>
  );
}

export default MapSearchInput;
