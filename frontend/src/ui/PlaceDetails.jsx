import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import PlaceDetailCard from "./PlaceDetailCard";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  max-width: 100%;
  padding-top: 0.9rem;
  background-color: #fff;
`;

const CardsContainer = styled.div``;

const ITEMS_PER_PAGE = 5;

function PlaceDetails() {
  let dataArray = null;
  const { attractionsArray } = useSelector(store => store.attraction);
  const { hotelsArray } = useSelector(store => store.hotel);
  const { positionsArray } = useSelector(store => store.position);

  const location = useLocation();
  const pathname = location.pathname;

  if (pathname.includes("/attractions")) {
    dataArray = attractionsArray;
  } else if (pathname.includes("/hotels")) {
    dataArray = hotelsArray;
  } else if (pathname.includes("/positions")) {
    dataArray = positionsArray;
  }

  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  if (!dataArray) return <div>Data is Loading...</div>;

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = dataArray.slice(startIndex, endIndex);
  const pageCount = Math.ceil(dataArray.length / ITEMS_PER_PAGE);

  return (
    <Container>
      <CardsContainer>
        {currentItems.map(item => (
          <PlaceDetailCard key={item.position_id} item={item} />
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
