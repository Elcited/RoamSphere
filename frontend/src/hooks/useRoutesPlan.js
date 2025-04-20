import { useEffect } from "react";

export default function useRoutesPlan(AMap) {
  console.log(AMap);
  useEffect(() => {
    AMap.plugin("AMap.Driving", () => {
      const driving = new AMap.Driving({ policy: 11 });

      driving.search(
        [
          { keyword: "北京市地震局（公交站）", city: "北京" },
          { keyword: "亦庄文化园（地铁站）", city: "北京" },
        ],
        (status, result) => {
          if (status === "complete" && result.routes.length) {
            console.log(result);
            console.log(result.routes);
          } else {
          }
        }
      );

      return () => driving.clearEvents && driving.clearEvents();
    });
  }, [AMap]);

  return null;
}
