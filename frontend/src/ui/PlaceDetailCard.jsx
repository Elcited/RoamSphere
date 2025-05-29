import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
import {
  setPlaceDetailPanelVisible,
  setSelectedPlaceIndex,
} from "../features/search/searchSlice";
import extractPlaceName from "../utils/extractPlaceName";
import PlaceOpenStatus from "./PlaceOpenStatus";
import defaultPlace from "../assets/images/default/default-place.png";
import { recordUserActivity } from "../utils/recordUserActivity";
import { useUserActivity } from "../hooks/useUserActivity";

const CardWrapper = styled.div`
  position: relative;
  border: 1px solid #e0e0e0;
  padding: 1.2rem;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  padding-right: 11.5rem; /* 留出图片宽度 + 缓冲区 */
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: #777;
  border-bottom: 0.5px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ddd;
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 0.6rem;
  width: 10rem;
  height: 10rem;
  background-color: #f0f0f0;
  border-radius: 1.2rem;
  overflow: hidden;
  box-shadow: 1px 5px 5px rgba(0, 0, 0, 0.1);
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Name = styled.h2`
  font-weight: 600;
  color: #333;
`;

const RatingLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TextLine = styled.div`
  line-height: 1.4;
`;

function PlaceDetailCard({ item, index }) {
  const dispatch = useDispatch();
  const { mapMode } = useSelector(store => store.map);
  const { positionKeyWord } = useSelector(store => store.position);
  const { mutate } = useUserActivity();

  const endPointMap = {
    attraction: "view-attraction",
    hotel: "view-hotel",
    position: "search-other-poi",
  };

  const handleClick = index => {
    dispatch(setPlaceDetailPanelVisible(true));
    dispatch(setSelectedPlaceIndex(index));
    console.log(mapMode);
    if (mapMode === "attraction" || mapMode === "hotel") {
      recordUserActivity(mutate, endPointMap[mapMode], { id: item.id });
    } else if (mapMode === "position") {
      recordUserActivity(mutate, endPointMap[mapMode], {
        keyword: positionKeyWord,
        poiType: item.business.keytag,
      });
    }
  };

  return (
    <>
      {item && (
        <CardWrapper onClick={() => handleClick(index)}>
          <ImageWrapper>
            <StyledImage
              src={item?.photos?.[0]?.url || defaultPlace}
              alt={item?.name}
              onError={e => {
                e.target.onerror = null; // 防止无限循环触发
                e.target.src = defaultPlace;
              }}
            />
          </ImageWrapper>

          <Name>{extractPlaceName(item.name)}</Name>

          {item.business.rating ? (
            <RatingLine>
              <Rating
                name="read-only-rating"
                value={item.business.rating ?? 0}
                precision={0.1}
                readOnly
                size="small"
              />
              <div>{item.business.rating}</div>
            </RatingLine>
          ) : (
            "暂无评分"
          )}

          <TextLine>{item.address}</TextLine>

          <TextLine>
            {item.type}
            {item.business.rectag && `•${item.business.rectag}`}
          </TextLine>

          {item.business.opentime_today && item.business.opentime_week && (
            <TextLine>
              <PlaceOpenStatus opentime={item.business.opentime_today} />
              {item.business.opentime_today === "全天开放" ||
              item.business.opentime_today === "24小时营业" ? (
                <span>•{item.business.opentime_today}</span>
              ) : (
                <span>
                  •{item.business.opentime_today.split("-").at(-1)}结束营业
                </span>
              )}
            </TextLine>
          )}
        </CardWrapper>
      )}
    </>
  );
}

export default PlaceDetailCard;
