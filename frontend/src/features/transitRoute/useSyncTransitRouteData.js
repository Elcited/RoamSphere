import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setRoutesInfo,
  setTransitCount,
  setTransitsDistance,
  setTransitsDuration,
  setTransitsFee,
  setIsAtNights,
  setTransitsStepCount,
  setTransitsStartTime,
  setTransitsEndTime,
  setTransitsTimeTips,
  setTransitsTimeTags,
  setTransitsRouteName,
  setTransitsRailways,
  setTransitsTaxis,
  setTravelMode,
  setBusPolyline,
  setSubwayPolyline,
  setCityRailwayPolyline,
  setTaxiPolyline,
  setTransitsPolylines,
} from "./transitRouteSlice";

export default function useSyncTransitRouteData(transitRoutes, shouldDispatch) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shouldDispatch || !transitRoutes?.length) return;

    const { parsedRouteDetail, parsedPolyline } = route;

    dispatch(setRoutesInfo(parsedRouteDetail));
    dispatch(setTransitCount(parsedRouteDetail.transitCount));
    dispatch(setTransitsDistance(parsedRouteDetail?.transitsDistance));
    dispatch(setTransitsDuration(parsedRouteDetail?.transitsDuration));
    dispatch(setTransitsFee(parsedRouteDetail?.transitsFee));
    dispatch(setIsAtNights(parsedRouteDetail?.isAtNights));
    dispatch(setTransitsStepCount(parsedRouteDetail?.transitsStepCount));
    dispatch(setTransitsStartTime(parsedRouteDetail?.transitsStartTime));
    dispatch(setTransitsEndTime(parsedRouteDetail?.transitsEndTime));
    dispatch(setTransitsTimeTips(parsedRouteDetail?.transitsTimeTips));
    dispatch(setTransitsTimeTags(parsedRouteDetail?.transitsTimeTags));
    dispatch(setTransitsRouteName(parsedRouteDetail?.transitsRouteName));
    dispatch(setTransitsRailways(parsedRouteDetail?.transitsRailway));
    dispatch(setTransitsTaxis(parsedRouteDetail?.transitsTaxis));
    dispatch(setTravelMode("transit"));

    dispatch(setBusPolyline(parsedPolyline?.busPolyline));
    dispatch(setSubwayPolyline(parsedPolyline?.subwayPolyline));
    dispatch(setCityRailwayPolyline(parsedPolyline?.cityRailwayPolyline));
    dispatch(setTaxiPolyline(parsedPolyline?.taxiPolyline));
    dispatch(setTransitsPolylines(parsedPolyline?.transitsPolylines));
  }, [transitRoutes, shouldDispatch, dispatch]);
}
