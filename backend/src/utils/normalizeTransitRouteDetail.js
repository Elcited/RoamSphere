function normalizeTransitRouteDetail(routeDetail) {
  if (!routeDetail) return null;

  const normalizeCoordinates = coordStr => {
    if (!coordStr) return null;
    return coordStr.split(",").map(Number);
  };

  const normalizeRailwayCoordinates = str => {
    if (!str || typeof str !== "string") return [0, 0];
    const parts = str.trim().split(" ");
    if (parts.length !== 2) return [0, 0];
    const [lng, lat] = parts.map(Number);
    return isNaN(lng) || isNaN(lat) ? [0, 0] : [lng, lat];
  };

  const normalizeStops = stops => {
    return (stops || []).map(stop => ({
      name: stop.name,
      id: stop.id,
      location: normalizeCoordinates(stop.location),
    }));
  };

  const normalizeSegment = segment => {
    const normalizedSegment = {};

    if (segment.walking) {
      normalizedSegment.walking = {
        origin: normalizeCoordinates(segment.walking.origin),
        destination: normalizeCoordinates(segment.walking.destination),
        distance: Number(segment.walking.distance) || 0,
        duration: Number(segment.walking.duration) || 0,
      };
    }

    if (segment.bus) {
      normalizedSegment.bus = (segment.bus || []).map(busline => ({
        departure_stop: {
          ...busline.departure_stop,
          location: normalizeCoordinates(busline.departure_stop.location),
        },
        arrival_stop: {
          ...busline.arrival_stop,
          location: normalizeCoordinates(busline.arrival_stop.location),
        },
        name: busline.name,
        id: busline.id,
        type: busline.type,
        distance: Number(busline.distance) || 0,
        cost: {
          duration: Number(busline.cost.duration) || 0,
        },
        bus_time_tips: busline.bus_time_tips,
        bustimetag: Number(busline.bustimetag),
        start_time: Number(busline.start_time),
        end_time: Number(busline.end_time),
        via_num: Number(busline.via_num) || 0,
        via_stops: normalizeStops(busline.via_stops),
      }));
    }

    if (segment.subway) {
      normalizedSegment.subway = (segment.subway || []).map(subwayline => ({
        departure_stop: {
          ...subwayline.departure_stop,
          location: normalizeCoordinates(subwayline.departure_stop.location),
          entrance: subwayline.departure_stop.entrance
            ? {
                name: subwayline.departure_stop.name,
                location: normalizeCoordinates(
                  subwayline.departure_stop.entrance.location
                ),
              }
            : {},
        },
        arrival_stop: {
          ...subwayline.arrival_stop,
          location: normalizeCoordinates(subwayline.arrival_stop.location),
          exit: subwayline.arrival_stop.exit
            ? {
                name: subwayline.arrival_stop.exit.name,
                location: normalizeCoordinates(
                  subwayline.arrival_stop.exit.location
                ),
              }
            : {},
        },
        name: subwayline.name,
        id: subwayline.id,
        type: subwayline.type,
        distance: Number(subwayline.distance) || 0,
        cost: {
          duration: Number(subwayline.cost.duration) || 0,
        },
        bus_time_tips: subwayline.bus_time_tips,
        bustimetag: Number(subwayline.bustimetag),
        start_time: Number(subwayline.start_time),
        end_time: Number(subwayline.end_time),
        via_num: Number(subwayline.via_num) || 0,
        via_stops: normalizeStops(subwayline.via_stops),
      }));
    }

    if (segment.cityRailway) {
      normalizedSegment.cityRailway = (segment.cityRailway || []).map(
        railwayline => ({
          departure_stop: {
            ...railwayline.departure_stop,
            location: normalizeCoordinates(railwayline.departure_stop.location),
          },
          arrival_stop: {
            ...railwayline.arrival_stop,
            location: normalizeCoordinates(railwayline.arrival_stop.location),
          },
          name: railwayline.name,
          id: railwayline.id,
          type: railwayline.type,
          distance: Number(railwayline.distance) || 0,
          cost: {
            duration: Number(railwayline.cost.duration) || 0,
          },
          bus_time_tips: railwayline.bus_time_tips,
          bustimetag: Number(railwayline.bustimetag),
          start_time: Number(railwayline.start_time),
          end_time: Number(railwayline.end_time),
          via_num: Number(railwayline.via_num) || 0,
          via_stops: normalizeStops(railwayline.via_stops),
        })
      );
    }

    if (segment.railway) {
      normalizedSegment.railway = {
        id: segment.railway.id,
        duration: Number(segment.railway.duration) || 0,
        name: segment.railway.name,
        trip: segment.railway.trip,
        distance: Number(segment.railway.distance) || 0,
        type: segment.railway.type,
        departure_stop: {
          ...segment.railway.departure_stop,
          location: normalizeRailwayCoordinates(
            segment.railway.departure_stop.location
          ),
        },
        arrival_stop: {
          ...segment.railway.arrival_stop,
          location: normalizeRailwayCoordinates(
            segment.railway.arrival_stop.location
          ),
        },
        railway_spaces: (segment.railway.railway_spaces || []).map(space => ({
          ...space,
        })),
      };
    }

    if (segment.taxi) {
      normalizedSegment.taxi = {
        distance: Number(segment.taxi.distance) || 0,
        price: Number(segment.taxi.price) || 0,
        drivetime: Number(segment.taxi.drivetime) || 0,
        startpoint: normalizeCoordinates(segment.taxi.startpoint),
        startname: segment.taxi.startname,
        endpoint: normalizeCoordinates(segment.taxi.endpoint),
        endname: segment.taxi.endname,
      };
    }

    return normalizedSegment;
  };

  return {
    ...routeDetail,
    start_location: {
      ...routeDetail.start_location,
      coordinates: Array.isArray(routeDetail.start_location.coordinates)
        ? routeDetail.start_location.coordinates.map(Number)
        : [0, 0],
    },
    end_location: {
      ...routeDetail.end_location,
      coordinates: Array.isArray(routeDetail.end_location.coordinates)
        ? routeDetail.end_location.coordinates.map(Number)
        : [0, 0],
    },
    transit_options: (routeDetail.transit_options || []).map(option => ({
      duration: Number(option.duration) || 0,
      transit_fee: Number(option.transit_fee) || 0,
      distance: Number(option.distance) || 0,
      walking_distance: Number(option.walking_distance) || 0,
      nightflag: Boolean(option.nightflag),
      segments: (option.segments || []).map(normalizeSegment),
    })),
  };
}

module.exports = normalizeTransitRouteDetail;
