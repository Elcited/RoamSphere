import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import DirectionsIcon from "@mui/icons-material/Directions";
import useAMapLoader from "../hooks/useAMapLoader";
import useQueryUpdater from "../hooks/useQueryUpdater";
import {
  setIsPositionRendered,
  setPositionCenterLocation,
  setPositionKeyWord,
  setPositionRegion,
  setPositionType,
} from "../features/positions/positionSlice";
import {
  setCurrentCenterLocation,
  setHasSearchResult,
  setMapMode,
} from "../features/map/mapSlice";
import { setIsRouteRendered } from "../features/routeDetail/routeSlice";
import { setSearchPanelExpanded } from "../features/search/searchSlice";
import { setIsAttractionRendered } from "../features/attractions/attractionSlice";
import { setIsHotelRendered } from "../features/hotels/hotelSlice";

const SearchBarWrapper = styled.div``;

function MapSearchInput() {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const { data: AMap, isSuccess, isLoading } = useAMapLoader();
  const { mapMode, hasSearchResult } = useSelector(store => store.map);
  const dispatch = useDispatch();
  const { updateQueryAndNavigate } = useQueryUpdater();
  const isDisplayCloseButton = mapMode !== "route" && hasSearchResult;

  const sharedInputStyles = {
    position: "absolute",
    top: "6px",
    left: "15px",
    width: "350px",
    height: "50px",
    border: "1px solid #ccc",
    borderRadius: "24px",
    padding: "8px 12px",
    fontSize: "1rem",
    backgroundColor: "#fff",
    boxSizing: "border-box",
    "&::placeholder": {
      color: "#999",
      fontSize: "1rem",
    },
    "&:focus-within": {
      boxShadow: "0 0 0 2px #1976d2 inset", // 更显眼的蓝色边框
    },
  };

  const handleSearch = () => {
    if (!inputValue.trim()) return;
    dispatch(setPositionCenterLocation(null));
    dispatch(setPositionKeyWord(inputValue));
    dispatch(setPositionRegion("全国"));
    dispatch(setPositionType(null));
    dispatch(setMapMode("position"));
    dispatch(setSearchPanelExpanded(true));
    dispatch(setHasSearchResult(true));
    dispatch(setCurrentCenterLocation(inputValue));

    updateQueryAndNavigate(
      {
        startLocation: null,
        endLocation: null,
        mapmode: "position",
        travelMode: null,
        positionKeyWord: inputValue,
      },
      "/map/positions",
      {
        replace: true,
        clearOthers: true,
      }
    );
  };

  const handleClosePanel = () => {
    dispatch(setSearchPanelExpanded(false));
    dispatch(setMapMode(null));
    dispatch(setHasSearchResult(false));
    dispatch(setIsAttractionRendered(false));
    dispatch(setIsHotelRendered(false));
    dispatch(setIsPositionRendered(false));
    updateQueryAndNavigate({}, "/map", {
      clearOthers: true,
    });
  };

  const handleNavigateClick = () => {
    dispatch(setSearchPanelExpanded(true));
    dispatch(setMapMode("route"));
    updateQueryAndNavigate(
      {
        mapmode: "route",
      },
      "/map/routes/route_overview",
      {
        clearOthers: true,
      }
    );
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
    <SearchBarWrapper>
      <InputBase
        value={inputValue}
        inputRef={inputRef}
        onChange={e => setInputValue(e.target.value)}
        placeholder="搜索 RoamSphere"
        fullWidth
        sx={{
          ...sharedInputStyles,
        }}
        endAdornment={
          <InputAdornment position="end" sx={{ ml: 1 }}>
            <IconButton onClick={handleSearch}>
              <SearchIcon fontSize="large" />
            </IconButton>
            {isDisplayCloseButton ? (
              <IconButton onClick={handleClosePanel}>
                <CloseIcon fontSize="large" />
              </IconButton>
            ) : (
              <IconButton onClick={handleNavigateClick}>
                <DirectionsIcon fontSize="large" sx={{ color: "#1976d2" }} />
              </IconButton>
            )}
          </InputAdornment>
        }
      />
    </SearchBarWrapper>
  );
}

export default MapSearchInput;

/* <Autocomplete
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
      /> */
