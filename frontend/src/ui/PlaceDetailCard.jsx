import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCommentIcon from "@mui/icons-material/AddComment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CommentDrawer from "./CommnetsDrawer";

const CardContainer = styled.div`
  padding-top: 0.9rem;
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoHeader = styled.div`
  padding: 0 1rem;
`;

const TextBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const TextItem = styled.div`
  display: inline-block;

  &:first-child {
    font-size: 2rem;
    font-weight: 500;
  }
`;

const RatingBox = styled.div`
  display: flex;
  align-items: center;
`;

const OptsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: start;
`;

function PlaceDetailCard({ item }) {
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleOpenDrawer() {
    setDrawerOpen(true);
  }

  function handleCloseDrawer() {
    setDrawerOpen(false);
  }

  return (
    <CardContainer>
      {item && (
        <Card>
          <CardContent>
            <InfoBox>
              <InfoHeader>
                <TextBox>
                  <TextItem>{item.name}</TextItem>
                  <TextItem>
                    <RatingBox>
                      <Rating
                        name="simple-controlled"
                        value={item.business.rating ?? 0}
                        readOnly
                      />
                      {item.business.rating}
                    </RatingBox>
                  </TextItem>
                  <TextItem>
                    {item.pname}
                    {item.adname}
                    {item.cityname}
                    {item.address}
                  </TextItem>
                  <TextItem>({item.type})</TextItem>
                  <TextItem>{`${item.business.opentime_today}，${item.business.opentime_week}`}</TextItem>
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
