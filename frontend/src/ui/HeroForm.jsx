import styled from "styled-components";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import HeroFormButton from "./HeroFormButton";
import {
  setEnd,
  setStart,
  setStrategy,
  setTravelMode,
} from "../features/routeDetail/routeSlice";
import {
  setCurrentCenterLocation,
  setHasRouteEnd,
  setMapMode,
  setUseEndAsCenter,
} from "../features/map/mapSlice";
import { setIsRoutesDrawerOpen } from "../features/routesDrawer/routesDrawerSlice";
import useQueryUpdater from "../hooks/useQueryUpdater";

const StyledForm = styled.form`
  font-family: inherit;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 4.8rem 4.8rem 2.4rem 4.8rem;
  border: 1px #fff solid;
  border-radius: 1.2rem;
  align-items: center;
  background-color: white;
  opacity: 0;
`;

const FormRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  font-size: 1.2rem;
  font-weight: 700;
  display: inline-block;
  margin-bottom: 1.2rem;
`;

const StyledInput = styled.input`
  font-family: inherit;
  width: 100%;
  padding: 1.2rem;
  color: inherit;
  font-size: 1.8rem;
  font-family: inherit;
  border: none;
  background-color: #eee;
  border-radius: 9px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const userId = "122a3422ssasd";

function HeroForm() {
  const formRef = useRef(null);
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");

  const dispatch = useDispatch();
  const { updateQueryAndNavigate } = useQueryUpdater();

  const handleStartInput = point => {
    setStartInput(point);
  };

  const handleEndInput = point => {
    setEndInput(point);
  };

  const handleClick = userId => {
    dispatch(setStart(startInput));
    dispatch(setEnd(endInput));
    dispatch(setCurrentCenterLocation(endInput));
    dispatch(setUseEndAsCenter(true));
    dispatch(setHasRouteEnd(true));
    dispatch(setMapMode("route"));
    dispatch(setTravelMode("driving"));
    dispatch(setStrategy(`0,1,2`));
    dispatch(setIsRoutesDrawerOpen(true));

    updateQueryAndNavigate(
      {
        startLocation: startInput,
        endLocation: endInput,
        strategy: 2,
        mapmode: "route",
        travelMode: "driving",
      },
      "/map/routes/route_overview/route_detail",
      {
        state: "fromHomePage",
      }
    );
  };

  useEffect(() => {
    gsap.to(formRef.current, {
      opacity: 0.9,
      duration: 3,
    });
  }, []);

  return (
    <StyledForm ref={formRef}>
      <FormRow>
        <StyledLabel htmlFor="start">旅行出发地：</StyledLabel>
        <StyledInput
          type="text"
          name="start-point"
          id="start"
          placeholder="起点"
          value={startInput}
          onChange={e => handleStartInput(e.target.value)}
        />
      </FormRow>
      <FormRow>
        <StyledLabel htmlFor="end">到：</StyledLabel>
        <StyledInput
          type="text"
          name="end-point"
          id="end"
          placeholder="终点"
          value={endInput}
          onChange={e => handleEndInput(e.target.value)}
        />
      </FormRow>
      <HeroFormButton
        handleClick={handleClick}
        label="准 备 !"
        hoverLabel="出 发 !"
      />
    </StyledForm>
  );
}

export default HeroForm;
