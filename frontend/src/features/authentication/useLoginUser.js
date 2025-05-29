import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import useQueryUpdater from "../../hooks/useQueryUpdater";
import { loginSuccess } from "./userSlice";
import {
  setPlaceDetailPanelVisible,
  setSearchPanelExpanded,
} from "../search/searchSlice";
import { clearAttractionSlice } from "../attractions/attractionSlice";
import { clearHotelSlice } from "../hotels/hotelSlice";
import { clearPositionSlice } from "../positions/positionSlice";
import { clearDrivingRoute } from "../drivingRoute/drivingRouteSlice";
import { clearCyclingRoute } from "../cyclingRoute/cyclingRouteSlice";
import { clearTransitRoute } from "../transitRoute/transitRouteSlice";
import { clearWalkingRoute } from "../walkingRoute/walkingRouteSlice";
import { setStart, setStartEndEmpty } from "../routeDetail/routeSlice";

export default function useLoginUser() {
  const dispatch = useDispatch();
  const { updateQueryAndNavigate } = useQueryUpdater();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async credentials => {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "登录失败");
      }

      return response.json();
    },
    onSuccess(response) {
      const { data, token } = response;
      const { user } = data;

      /* 在缓存中设置user数据 */
      queryClient.setQueryData(["currentUser"], user);
      queryClient.invalidateQueries(["currentUser"]);
      dispatch(loginSuccess(response));
      dispatch(setPlaceDetailPanelVisible(false));
      dispatch(setSearchPanelExpanded(false));
      dispatch(setStartEndEmpty());
      dispatch(clearAttractionSlice());
      dispatch(clearHotelSlice());
      dispatch(clearPositionSlice());
      dispatch(clearDrivingRoute());
      dispatch(clearCyclingRoute());
      dispatch(clearTransitRoute());
      dispatch(clearWalkingRoute());
      updateQueryAndNavigate(
        {
          id: user.id,
        },
        "/map",
        {
          clearOthers: true,
        }
      );
    },
  });
}
