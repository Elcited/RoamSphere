import { forwardRef, useState } from "react";
import styled from "styled-components";
import DirectionsIcon from "@mui/icons-material/Directions";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import useQueryUpdater from "../hooks/useQueryUpdater";
import { useDispatch, useSelector } from "react-redux";
import { setStart, setEnd } from "../features/routeDetail/routeSlice";
import { setCurrentCenterLocation, setMapMode } from "../features/map/mapSlice";
import { setPlaceDetailPanelVisible } from "../features/search/searchSlice";
import useSelectedPlaceDetail from "../features/search/useSelectedPlaceDetail";
import { useUserActivity } from "../hooks/useUserActivity";
import { recordUserActivity } from "../utils/recordUserActivity";
import useToggleFavorite from "../hooks/useToggleFavoritePOI";
import { useFavorites } from "../hooks/useFavorite";
import useIsPOIFavorited from "../hooks/useIsPOIFavorited";
import useAuth from "../features/authentication/useAuth";
import { clearDrivingRoute } from "../features/drivingRoute/drivingRouteSlice";
import { clearTransitRoute } from "../features/transitRoute/transitRouteSlice";
import { clearWalkingRoute } from "../features/walkingRoute/walkingRouteSlice";
import { clearCyclingRoute } from "../features/cyclingRoute/cyclingRouteSlice";

const Section = styled.div`
  margin-bottom: 3rem;
`;

const ActionButtonWrapper = styled.div`
  width: 100%;
  padding: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  border-bottom: 1px solid #eee;
`;

const ActionButton = styled.button`
  color: #1976d2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem;
  border: none;
  background-color: #fff;
  cursor: pointer;

  & span {
    display: inline-block;
  }
`;

const PlaceDetailOverviewSection = forwardRef((props, ref) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const { updateQueryAndNavigate } = useQueryUpdater();
  const { mapMode } = useSelector(store => store.map);
  const { isAuthenticated } = useAuth();
  const { mutate } = useUserActivity();
  const { data: favoritedItems } = useFavorites();
  const favorites = favoritedItems?.favorites ?? [];
  const { mutate: toggleFavorite, isPending: isTogglePending } =
    useToggleFavorite();
  const dispatch = useDispatch();
  const selectedItem = useSelectedPlaceDetail();
  const { name } = selectedItem || {};

  let poiData = null;
  if (selectedItem && !selectedItem.id) {
    poiData = {
      name: selectedItem.name,
      address: selectedItem.address,
      location: selectedItem.location,
      type: selectedItem.type,
      business: selectedItem.business,
    };
  }

  const refTypeMap = {
    attraction: "Attraction",
    hotel: "Hotel",
    position: "ExternalPOI",
  };

  // 目标 POI id
  const poiId = selectedItem && (selectedItem.id || selectedItem.position_id);

  // 判断是否已收藏
  const isCurrentlyFavorited = useIsPOIFavorited(
    selectedItem,
    favorites,
    mapMode,
    refTypeMap,
    poiId
  );

  const handleClickNavigate = () => {
    dispatch(setStart(""));
    dispatch(setEnd(name));
    dispatch(setPlaceDetailPanelVisible(false));
    // dispatch(clearDrivingRoute());
    // dispatch(clearTransitRoute());
    // dispatch(clearWalkingRoute());
    // dispatch(clearCyclingRoute());
    dispatch(setMapMode("route"));
    updateQueryAndNavigate(
      {
        mapmode: "route",
      },
      "/map/routes/route_overview",
      {
        clearOthers: true,
        replace: true,
      }
    );
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      setSnackbarMsg("请先登录后再收藏");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    // 记录用户行为
    recordUserActivity(mutate, "favorite-poi", {
      poiId: selectedItem.id || selectedItem.position_id,
      poiType: selectedItem.business.keytag,
      isInternal: selectedItem.id ? true : false,
      name: selectedItem.name,
    });

    // 添加、删除收藏
    toggleFavorite(
      {
        poiId,
        refType: refTypeMap[mapMode],
        isCurrentlyFavorited,
        poiData,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["currentUser", "favorites"]);
          setSnackbarMsg(isCurrentlyFavorited ? "已取消收藏" : "收藏成功！");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
        },
      }
    );
  };
  const handleClickNearby = () => {
    dispatch(setCurrentCenterLocation(name));
    dispatch(setPlaceDetailPanelVisible(false));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const actionButtonConfigs = [
    {
      label: "导航",
      type: "navigate",
      element: <DirectionsIcon sx={{ color: "#1976d2" }} fontSize="large" />,
      handler: handleClickNavigate,
    },
    {
      label: "收藏",
      type: "favorite",
      element: isTogglePending ? (
        <CircularProgress size={24} color="primary" />
      ) : isCurrentlyFavorited ? (
        <TurnedInIcon sx={{ color: "#1976d2" }} fontSize="large" />
      ) : (
        <TurnedInNotIcon sx={{ color: "#1976d2" }} fontSize="large" />
      ),
      handler: handleToggleFavorite,
    },
    {
      label: "附近",
      type: "nearby",
      element: <ShareLocationIcon sx={{ color: "#1976d2" }} fontSize="large" />,
      handler: handleClickNearby,
    },
  ];

  return (
    <Section ref={ref}>
      <ActionButtonWrapper>
        {actionButtonConfigs.map(actionButton => (
          <ActionButton key={actionButton.type} onClick={actionButton.handler}>
            {actionButton.element}
            <span>{actionButton.label}</span>
          </ActionButton>
        ))}
      </ActionButtonWrapper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          elevation={6}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </MuiAlert>
      </Snackbar>
    </Section>
  );
});

export default PlaceDetailOverviewSection;
