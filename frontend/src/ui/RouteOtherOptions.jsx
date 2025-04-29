import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setTravelMode } from "../features/routeDetail/routeDetailSlice";
import useQueryUpdater from "../hooks/useQueryUpdater";

const Container = styled.div`
  padding: 0.9rem;
`;

const OtherTrafficOptsBox = styled.div`
  padding: 1.2rem;
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

const OtherTrafficOption = styled.div`
  width: 7rem;
  border-radius: 1.5rem;
  padding: 0.6rem;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

function RouteOtherOptions() {
  const dispatch = useDispatch();
  const { updateQueryAndNavigate } = useQueryUpdater();

  const handleClick = mode => {
    dispatch(setTravelMode(mode));

    updateQueryAndNavigate(
      {
        travelMode: mode,
      },
      "/map/routes/route_overview/route_detail",
      {
        replace: true,
      }
    );
  };

  const optionConfigs = [
    {
      id: "transit",
      title: "公共交通",
      handler: handleClick,
    },
    {
      id: "walking",
      title: "步行",
      handler: handleClick,
    },
    {
      id: "cycling",
      title: "骑行",
      handler: handleClick,
    },
  ];

  return (
    <Container>
      <OtherTrafficOptsBox>
        <div>其他出行方式：</div>
        {optionConfigs.map(option => (
          <OtherTrafficOption
            key={option.id}
            onClick={() => option.handler(option.id)}
          >
            {option.title}
          </OtherTrafficOption>
        ))}
      </OtherTrafficOptsBox>
    </Container>
  );
}

export default RouteOtherOptions;
