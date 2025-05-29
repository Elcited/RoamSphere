import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useReverseGeocodeQuery from "../../hooks/useReverseGeocodeQuery";
import useAMapLoader from "../../hooks/useAMapLoader";
import { setStart, setEnd } from "../routeDetail/routeSlice";

export default function useAutoFillInputFromClick({ currentInputRef }) {
  const dispatch = useDispatch();
  const { clickedLngLat } = useSelector(state => state.map);
  const { data: AMap } = useAMapLoader();
  const start = useSelector(state => state.route.start);
  const end = useSelector(state => state.route.end);

  const lastFilledRef = useRef(null); // "start" 或 "end" 或 null，记住上次填哪个了

  const { data: reversedAddress, isSuccess } = useReverseGeocodeQuery(
    AMap,
    clickedLngLat
  );

  useEffect(() => {
    if (!isSuccess || !reversedAddress) return;

    const current = currentInputRef?.current;

    // 判断当前输入框里是否有值，若有值则不用转换地址覆盖
    const canSet = (field, val) => {
      return !val || val.trim() === "";
    };

    // 如果指定了激活输入框，直接填，不管之前填了啥
    if (current === "start") {
      if (canSet("start", start)) {
        dispatch(setStart(reversedAddress));
        lastFilledRef.current = "start";
      }
      return;
    }
    if (current === "end") {
      if (canSet("end", end)) {
        dispatch(setEnd(reversedAddress));
        lastFilledRef.current = "end";
      }
      return;
    }
  }, [isSuccess, reversedAddress, dispatch, start, end]);
}
