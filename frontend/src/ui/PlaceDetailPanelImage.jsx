import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setPlaceDetailPanelVisible } from "../features/search/searchSlice";
import CloseIcon from "@mui/icons-material/Close";
import useSelectedPlaceDetail from "../features/search/useSelectedPlaceDetail";
import defaultPlace from "../assets/images/default/default-place.png";

const PanelImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 20rem;
  background-color: #f0f0f0;

  &:hover button {
    opacity: 1;
    pointer-events: auto;
  }
`;

const PanelImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  object-fit: cover;
`;

const CloseButton = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ViewPhotosButton = styled.button`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
`;

function PlaceDetailPanelImage() {
  const dispatch = useDispatch();

  const selectedItem = useSelectedPlaceDetail();
  const { name, photos } = selectedItem || {};

  const handleClose = () => {
    dispatch(setPlaceDetailPanelVisible(false));
  };

  return (
    <PanelImageWrapper>
      <PanelImage
        src={photos?.[0]?.url || defaultPlace}
        alt={name}
        onError={e => {
          e.target.onerror = null;
          e.target.src = defaultPlace;
        }}
      />
      {photos?.[0]?.url && <ViewPhotosButton>查看照片</ViewPhotosButton>}
      <CloseButton onClick={handleClose}>
        <CloseIcon fontSize="large" />
      </CloseButton>
    </PanelImageWrapper>
  );
}

export default PlaceDetailPanelImage;
