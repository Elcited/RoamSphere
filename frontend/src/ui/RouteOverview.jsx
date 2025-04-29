import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import SyncIcon from "@mui/icons-material/Sync";
import SearchInput from "./SearchInput";
import RouteInfoCard from "./RouteInfoCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { setEnd, setStart } from "../features/routeDetail/routeDetailSlice";
import RouteOtherOptions from "./RouteOtherOptions";
import { setMapMode } from "../features/map/mapSlice";

const Container = styled.div`
  padding: 0.9rem;
`;

const InputsContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  font-size: 2.4rem;
`;

const RoutesInfoBox = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

function RouteOverview() {
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");
  const { start, end, strategyList } = useSelector(store => store.routeDetail);
  const {} = useSelector(store => store.routeDetail);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSwap = () => {
    setStartInput(endInput);
    setEndInput(startInput);

    dispatch(setStart(endInput));
    dispatch(setEnd(startInput));
    dispatch(setMapMode("route"));
  };

  useEffect(() => {
    setStartInput(start);
  }, [start]);

  useEffect(() => {
    setEndInput(end);
  }, [end]);

  return (
    <Container>
      {location.pathname.includes("route_detail") ? (
        <Outlet />
      ) : (
        <>
          <InputsContainer>
            <SearchInput value={startInput} onChange={setStartInput} />
            <IconButton onClick={handleSwap}>
              <SyncIcon />
            </IconButton>
            <SearchInput value={endInput} onChange={setEndInput} />
          </InputsContainer>
          <RoutesInfoBox>
            <h3>路线推荐</h3>
            {strategyList.map(s => (
              <RouteInfoCard
                key={s.strategy}
                title={s.title}
                desc={s.desc}
                newStrategy={s.strategy}
              />
            ))}
          </RoutesInfoBox>

          <RouteOtherOptions />
        </>
      )}
    </Container>
  );
}

export default RouteOverview;
