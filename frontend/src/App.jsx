import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import GlobalStyles from "./styles/GlobalStyles";
import Home from "./pages/Home";
import Error from "./pages/Error";

const UserCenter = lazy(() => import("./pages/UserCenter"));
const MainMap = lazy(() => import("./pages/MainMap"));
const RoutePlanner = lazy(() => import("./ui/RoutePlanner"));
const PlaceDetails = lazy(() => import("./ui/PlaceDetails"));
const RoutesDetail = lazy(() => import("./ui/RoutesDetail"));
const RouteInfo = lazy(() => import("./ui/RouteInfo"));
const RouteOverview = lazy(() => import("./ui/RouteOverview"));

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<div>页面加载中...</div>}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="profile" element={<UserCenter />} />
              <Route path="map" element={<MainMap />}>
                <Route path="routes" element={<RoutesDetail />}>
                  <Route path="route_overview" element={<RouteOverview />}>
                    <Route path="route_detail" element={<RouteInfo />} />
                  </Route>
                </Route>
                <Route path="attractions" element={<PlaceDetails />} />
                <Route path="hotels" element={<PlaceDetails />} />
                <Route path="positions" element={<PlaceDetails />} />
                <Route path="custom" element={<RoutePlanner />} />
              </Route>
              <Route path="*" element={<Error />} />
            </Routes>
          </Suspense>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
