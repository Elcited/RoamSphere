import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { setIsGetMapCenter } from "../features/map/mapSlice";

const Container = styled.div`
  min-width: 4rem;
  border-radius: 1.5rem;
  padding: 0.6rem;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 5.5rem;
  left: 55rem;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background-color: #f8f8f8;
  }
`;

const SwitchText = styled.div`
  font-size: 1.2rem;
  letter-spacing: 1.2px;
  margin-left: 0.5rem;
`;

function MapCenterToggle() {
  const { isGetMapCenter, useEndAsCenter } = useSelector(store => store.map);
  const dispatch = useDispatch();

  const handleChange = useCallback(
    e => {
      const newState = e.target.checked;
      dispatch(setIsGetMapCenter(newState));
    },
    [dispatch]
  );

  return (
    <Container>
      <Switch
        checked={isGetMapCenter}
        onChange={handleChange}
        inputProps={{ "aria-label": "isGetMapCenter" }}
        disabled={useEndAsCenter}
      />
      <SwitchText>在附近搜索</SwitchText>
    </Container>
  );
}

export default MapCenterToggle;
