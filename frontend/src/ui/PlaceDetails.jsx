import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import PlaceDetailCard from "./PlaceDetailCard";

const Container = styled.div`
  padding: 0.9rem;
  background-color: #fff;
`;

const DetailHeader = styled.div`
  font-size: 2.4rem;
  font-weight: 500;
`;

const CardsContainer = styled.div`
  /* box-shadow: ; */
`;

const ITEMS_PER_PAGE = 5;

function PlaceDetails() {
  const { attractionsCount, attractionsArray } = useSelector(
    store => store.attraction
  );

  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = attractionsArray.slice(startIndex, endIndex);
  const pageCount = Math.ceil(attractionsArray.length / ITEMS_PER_PAGE);

  return (
    <Container>
      <DetailHeader>在所选范围内查询到{attractionsCount}个景点</DetailHeader>
      <CardsContainer>
        {currentItems.map(attraction => (
          <PlaceDetailCard
            key={attraction.attraction_id}
            attraction={attraction}
          />
        ))}
      </CardsContainer>
      <Pagination
        count={pageCount}
        page={page}
        onChange={handleChange}
        color="secondary"
        sx={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}
      />
    </Container>
  );
}

export default PlaceDetails;
