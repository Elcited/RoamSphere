import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCommentIcon from "@mui/icons-material/AddComment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CommentDrawer from "./CommnetsDrawer";

const CardContainer = styled.div`
  padding: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  font-size: 1.6rem;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const InfoHeader = styled.div`
  padding: 1.2rem;
`;

const TextBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 1.6rem;
  justify-content: center;
  align-content: start;
`;

const TextItem = styled.div`
  display: inline-block;
`;

const RatingBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 5px;
`;

const OptsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: start;
  gap: 2.4rem;
`;

const InfoBody = styled.div``;

function PlaceDetailCard({ attraction }) {
  const dispatch = useDispatch();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  function handleOpenDrawer() {
    setDrawerOpen(true);
  }

  function handleCloseDrawer() {
    setDrawerOpen(false);
  }

  return (
    <CardContainer>
      {attraction && (
        <Card>
          <CardContent>
            <InfoBox>
              <InfoHeader>
                <TextBox>
                  <TextItem>{attraction.name}</TextItem>
                  <TextItem>{attraction.address}</TextItem>
                  <TextItem>
                    <RatingBox>
                      <Rating
                        name="simple-controlled"
                        value={attraction.business.rating}
                        readOnly
                      />
                      {attraction.business.rating}
                    </RatingBox>
                  </TextItem>
                  <TextItem>{`${attraction.business.opentime_today}，${attraction.business.opentime_week}`}</TextItem>
                </TextBox>
              </InfoHeader>
              <OptsContainer>
                <Tooltip title="看看评价" placement="bottom">
                  <IconButton
                    onClick={handleOpenDrawer}
                    sx={{ cursor: "pointer" }}
                  >
                    <AddCommentIcon color="secondary" fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="点击定位" placement="bottom">
                  <IconButton sx={{ cursor: "pointer" }}>
                    <LocationOnIcon color="secondary" fontSize="large" />
                  </IconButton>
                </Tooltip>
              </OptsContainer>
              <InfoBody>
                <Accordion>
                  <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                    详细信息
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextBox>
                      <TextItem>{attraction.pname}</TextItem>
                      <TextItem>{attraction.adname}</TextItem>
                      <TextItem>{attraction.cityname}</TextItem>
                      <TextItem>{attraction.type}</TextItem>
                    </TextBox>
                  </AccordionDetails>
                </Accordion>
              </InfoBody>
            </InfoBox>
          </CardContent>
        </Card>
      )}
      <CommentDrawer
        drawerOpen={drawerOpen}
        handleCloseDrawer={handleCloseDrawer}
      />
    </CardContainer>
  );
}

export default PlaceDetailCard;
