import styled from "styled-components";
import Rating from "@mui/material/Rating";
import useSelectedPlaceDetail from "../features/search/useSelectedPlaceDetail";

const PanelBodyHeader = styled.div`
  padding: 1.6rem;
`;

const PlaceTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  margin: 0;
`;

const RatingRow = styled.div`
  margin-top: 0.8rem;
  font-size: 1.4rem;
  color: #666;
`;

const CategoryRow = styled.div`
  margin: 0.4rem 0;
  font-size: 1.3rem;
  color: #888;
`;

function PlaceDetailPanelBodyHeader() {
  const selectedItem = useSelectedPlaceDetail();
  const { name, business } = selectedItem || {};
  const { rating, rectag } = business || {};

  return (
    <PanelBodyHeader>
      <PlaceTitle>{name}</PlaceTitle>
      <RatingRow>
        {rating ? (
          <Rating name="read-only" value={rating} readOnly />
        ) : (
          "暂无评价"
        )}
      </RatingRow>
      <CategoryRow>{rectag}</CategoryRow>
    </PanelBodyHeader>
  );
}

export default PlaceDetailPanelBodyHeader;
