import styled from "styled-components";
import gsap from "gsap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import HeroFormButton from "./HeroFormButton";
import {
  setEnd,
  setStart,
  setStrategy,
} from "../features/routeDetail/routeDetailSlice";
import { setMapMode } from "../features/map/mapSlice";
import { setIsRoutesDrawerOpen } from "../features/routesDrawer/routesDrawerSlice";

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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { start, end } = useSelector(store => store.routeDetail);

  const handleStartInput = point => {
    dispatch(setStart(point));
  };

  const handleEndInput = point => {
    dispatch(setEnd(point));
  };

  const handleClick = userId => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("startPoint", start);
    newParams.set("endPoint", end);

    dispatch(setMapMode("route"));
    dispatch(setStrategy(2));
    dispatch(setIsRoutesDrawerOpen(true));

    navigate(`map/routes/route_detail?${newParams.toString()}`, {
      state: "fromHomePage",
    });
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
          value={start}
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
          value={end}
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
