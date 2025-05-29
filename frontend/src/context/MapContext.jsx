import { createContext, useContext, useState } from "react";

const MapContext = createContext();

function MapProvider({ children }) {
  const [coordinates, setCoordinates] = useState({
    startLocation: null,
    endLocation: null,
    attractionCoordinate: null,
    hotelCoordinate: null,
    positionCoordinate: null,
  });

  return (
    <MapContext.Provider
      value={{
        coordinates,
        setCoordinates,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

function useMapContext() {
  const context = useContext(MapContext);
  if (context === "undefined") {
    throw new Error("MapContext was used outside the MapProvider");
  }

  return context;
}

export { MapProvider, useMapContext };
