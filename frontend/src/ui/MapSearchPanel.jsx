import styled from "styled-components";

import MapSearchInput from "./MapSearchInput";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearchPanelExpand } from "../features/map/mapSlice";

const PanelWrapper = styled.div`
  position: absolute;
  top: 0.75rem;
  left: 8rem;
  width: 30vw;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
  padding: 1.2rem;
  z-index: 20;
  max-height: calc(100vh - 3.2rem);
  overflow-y: scroll;
`;

const InputBox = styled.div`
  padding: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
`;

function MapSearchPanel({ children }) {
  const { isSearchPanelExpand } = useSelector(store => store.map);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isSearchPanelExpand);
  }, [isSearchPanelExpand]);

  return (
    <PanelWrapper>
      <InputBox>
        <MapSearchInput />
      </InputBox>
      <Accordion
        expanded={isSearchPanelExpand}
        onChange={() => dispatch(setIsSearchPanelExpand(!isSearchPanelExpand))}
        sx={{
          width: "100%",
          mt: 1,
          "& .MuiAccordionSummary-root": {
            minHeight: "36px",
            height: "36px",
          },
          "& .MuiAccordionSummary-content": {
            margin: 0,
          },
          "& .MuiAccordionDetails-root": {
            padding: isSearchPanelExpand ? "8px 16px" : 0,
          },
        }}
      >
        <AccordionSummary>展开搜索结果</AccordionSummary>
        <AccordionDetails>
          {isSearchPanelExpand ? children : null}
        </AccordionDetails>
      </Accordion>
    </PanelWrapper>
  );
}

export default MapSearchPanel;
