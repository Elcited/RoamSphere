import styled from "styled-components";
import PlaceDetailCard from "./PlaceDetailCard";
import usePlaceDetailData from "../features/search/usePlaceDetailData";
import { CircularProgress } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useMapContext } from "../context/MapContext";
import useAttractionData from "../features/attractions/useAttractionData";

const Container = styled.div`
  max-width: 100%;
  background-color: #fff;
  padding: 1rem;
`;

const Header = styled.h2`
  color: #333;
  padding: 0.6rem 0;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12rem;
`;

const EmptyText = styled.p`
  text-align: center;
  color: #888;
  padding: 2rem 0;
`;

function PlaceDetails() {
  const queryClient = useQueryClient();
  const dataArray = usePlaceDetailData();

  return (
    <Container>
      <Header>结果</Header>

      {dataArray === null || dataArray === undefined ? (
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      ) : dataArray.length === 0 ? (
        <EmptyText>暂无符合条件的结果</EmptyText>
      ) : (
        dataArray.map((item, index) => (
          <PlaceDetailCard
            key={`${item.position_id || item.id}-${index}`}
            item={item}
            index={index}
          />
        ))
      )}
    </Container>
  );
}

export default PlaceDetails;
