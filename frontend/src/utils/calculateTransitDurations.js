export default function calculateTransitDurations(segments = []) {
  const rawDurations = {
    walking: 0,
    bus: 0,
    subway: 0,
    cityRailway: 0,
    railway: 0,
    taxi: 0,
  };

  segments.forEach(segment => {
    if (segment.walking?.duration) {
      const minutes = parseInt(segment.walking.duration);
      if (!isNaN(minutes)) rawDurations.walking += minutes;
    }

    ["bus", "subway", "cityRailway"].forEach(type => {
      segment[type]?.forEach(item => {
        if (typeof item.duration === "number") {
          rawDurations[type] += item.duration / 60;
        }
      });
    });

    if (segment.railway?.duration) {
      rawDurations.railway += segment.railway.duration / 60;
    }

    if (segment.taxi?.duration) {
      rawDurations.taxi += segment.taxi.duration / 60;
    }
  });

  const filtered = {};
  for (const [type, value] of Object.entries(rawDurations)) {
    const rounded = Math.round(value);
    if (rounded > 0) filtered[type] = rounded;
  }

  return filtered;
}
