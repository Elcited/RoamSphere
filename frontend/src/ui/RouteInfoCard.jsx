import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button } from "@mui/material";
import {
  setIsClickNavigation,
  setStrategy,
} from "../features/routeDetail/routeDetailSlice";
import useQueryUpdater from "../hooks/useQueryUpdater";

const Container = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const CardContentItem = styled.div`
  padding: 0.9rem;
`;

function RouteInfoCard({ title, desc, newStrategy }) {
  const { info, strategy } = useSelector(store => store.routeDetail);
  const dispatch = useDispatch();

  const { updateQueryAndNavigate } = useQueryUpdater();

  const handleChangeStrategy = () => {
    dispatch(setStrategy(newStrategy));
    dispatch(setIsClickNavigation(true));

    updateQueryAndNavigate(
      {
        strategy: newStrategy,
      },
      "/map/routes/route_overview/route_detail",
      {
        replace: true,
      }
    );
  };

  if (!info) return <div>Loading...</div>;

  return (
    <Container>
      <Card>
        <CardContent>
          <CardContentItem>{title}</CardContentItem>
          <CardContentItem>{desc}</CardContentItem>
          <Button onClick={handleChangeStrategy}>开始导航</Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default RouteInfoCard;
