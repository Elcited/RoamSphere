export default function parseTransitPolylines(polylines) {
  return polylines.map(polylineGroup => {
    return polylineGroup.map(polyline => {
      const segments = polyline.segments.map(segment => {
        const result = [];

        if (segment.walking !== null) {
          result.push({
            type: "walking",
            polylines: segment.walking.polyline.flatMap(p =>
              p.split(";").map(point => {
                const [lng, lat] = point.split(",");
                return { lng: parseFloat(lng), lat: parseFloat(lat) };
              })
            ),
            instructions: segment.walking.instructions,
          });
        }

        if (segment.bus !== null) {
          segment.bus.forEach(busRoute => {
            result.push({
              type: "bus",
              polylines: busRoute.split(";").map(point => {
                const [lng, lat] = point.split(",");
                return { lng: parseFloat(lng), lat: parseFloat(lat) };
              }),
            });
          });
        }

        if (segment.subway !== null) {
          segment.subway.forEach(subwayRoute => {
            result.push({
              type: "subway",
              polylines: subwayRoute.split(";").map(point => {
                const [lng, lat] = point.split(",");
                return { lng: parseFloat(lng), lat: parseFloat(lat) };
              }),
            });
          });
        }

        if (segment.cityRailway !== null) {
          segment.cityRailway.forEach(cityRailwayRoute => {
            result.push({
              type: "cityRailway",
              polylines: cityRailwayRoute.split(";").map(point => {
                const [lng, lat] = point.split(",");
                return { lng: parseFloat(lng), lat: parseFloat(lat) };
              }),
            });
          });
        }

        if (segment.taxi !== null && segment.taxi.polyline) {
          result.push({
            type: "taxi",
            polylines: segment.taxi.polyline.split(";").map(point => {
              const [lng, lat] = point.split(",");
              return { lng: parseFloat(lng), lat: parseFloat(lat) };
            }),
          });
        }

        return result;
      });

      return { segments };
    });
  });
}
