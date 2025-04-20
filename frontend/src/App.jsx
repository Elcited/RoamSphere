import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import GlobalStyles from "./styles/GlobalStyles";
import Home from "./pages/Home";
import UserCenter from "./pages/UserCenter";
import MainMap from "./pages/MainMap";
import Error from "./pages/Error";
import RoutePlanner from "./ui/RoutePlanner";
import PlaceDetails from "./ui/PlaceDetails";
import HotelDetails from "./ui/HotelDetails";
import RoutesDetail from "./ui/RoutesDetail";
import RouteInfo from "./ui/RouteInfo";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="profile" element={<UserCenter />} />
            <Route path="map" element={<MainMap />}>
              <Route path="routes" element={<RoutesDetail />}>
                <Route path="route_detail" element={<RouteInfo />} />
              </Route>
              <Route path="attractions" element={<PlaceDetails />} />
              <Route path="hotels" element={<HotelDetails />} />
              <Route path="custom" element={<RoutePlanner />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
