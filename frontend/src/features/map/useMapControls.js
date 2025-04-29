import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function useMapControls(AMap, map, isSuccess) {
  const { hawkEyeOpen, scaleOpen, compassOpen, zoomOpen } = useSelector(
    store => store.map
  );

  useEffect(() => {
    if (!AMap || !map) return;

    const plugins = [];
    if (zoomOpen) plugins.push("AMap.ToolBar");
    if (compassOpen) plugins.push("AMap.ControlBar");
    if (scaleOpen) plugins.push("AMap.Scale");
    if (hawkEyeOpen) plugins.push("AMap.HawkEye");

    let toolBarCtrl = null;
    let scaleCtrl = null;
    let hawkEyeCtrl = null;
    let controlBar = null;

    AMap.plugin(plugins, () => {
      if (zoomOpen) {
        toolBarCtrl = new AMap.ToolBar({
          position: {
            top: "300px",
            right: "130px",
          },
          autoPosition: false,
          visible: true,
        });
        map.addControl(toolBarCtrl);
      }

      if (scaleOpen) {
        scaleCtrl = new AMap.Scale({
          position: {
            bottom: "20px",
          },
          visible: true,
        });
        map.addControl(scaleCtrl);
      }

      if (hawkEyeOpen) {
        hawkEyeCtrl = new AMap.HawkEye({
          position: {
            right: "200px",
            top: "10px",
          },
          visible: true,
        });
        map.addControl(hawkEyeCtrl);
      }

      if (compassOpen) {
        controlBar = new AMap.ControlBar({
          showZoomBar: zoomOpen,
          showCompass: compassOpen,
          position: {
            right: "100px",
            top: "10px",
          },
        });
        map.addControl(controlBar);
      }
    });

    return () => {
      if (toolBarCtrl) map.removeControl(toolBarCtrl);
      if (scaleCtrl) map.removeControl(scaleCtrl);
      if (hawkEyeCtrl) map.removeControl(hawkEyeCtrl);
      if (controlBar) map.removeControl(controlBar);
    };
  }, [hawkEyeOpen, scaleOpen, compassOpen, zoomOpen, map]);
}
