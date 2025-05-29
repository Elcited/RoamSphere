import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

import GlobalStyles from "./styles/GlobalStyles";
import Home from "./pages/Home";
import Error from "./pages/Error";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import useAuth from "./features/authentication/useAuth";
import { useFavorites } from "./hooks/useFavorite";
import { MapProvider } from "./context/MapContext";

/* 注册页面 */
const Register = lazy(() => import("./pages/Register"));

/* 登录页面 */
const Login = lazy(() => import("./pages/Login"));

/* 用户中心页面 */
const UserCenter = lazy(() => import("./pages/UserCenter"));
const UserCenterOverview = lazy(() => import("./ui/UserCenterOverview"));
const UserCenterInformation = lazy(() => import("./ui/UseCenterInformation"));
const UserCenterDataPrivacy = lazy(() => import("./ui/UserCenterDataPrivacy"));
const UserCenterSafety = lazy(() => import("./ui/UserCenterSafety"));
const UserCenterSharing = lazy(() => import("./ui/UserCenterSharing"));
const UserCenterPaySubscribe = lazy(() =>
  import("./ui/UserCenterPaySubscribe")
);
const UserCenterAbout = lazy(() => import("./ui/UserCenterAbout"));
const UserInfoEditor = lazy(() => import("./ui/UserInfoEditor"));

/* 地图主功能页面 */
const MainMap = lazy(() => import("./pages/MainMap"));
const RoutePlanner = lazy(() => import("./ui/RoutePlanner"));
const PlaceDetails = lazy(() => import("./ui/PlaceDetails"));
const RoutesDetail = lazy(() => import("./ui/RoutesDetail"));
const RouteInfo = lazy(() => import("./ui/RouteInfo"));
const RouteOverview = lazy(() => import("./ui/RouteOverview"));

const AboutRoamSphere = lazy(() => import("./pages/AboutRoamSphere"));
const APIDocs = lazy(() => import("./pages/APIDocs"));
const BusinessContact = lazy(() => import("./pages/BusinessContact"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const JoinUs = lazy(() => import("./pages/JoinUs"));
const Partners = lazy(() => import("./pages/Partners"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

function App() {
  const { refetch, data } = useFavorites();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      refetch(); // 登录后拉收藏列表
    }
  }, [isAuthenticated]);

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <ThemeProvider theme={theme}>
          <Suspense fallback={<div>页面加载中...</div>}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="user" element={<UserCenter />}>
                <Route path="overview" element={<UserCenterOverview />}></Route>
                <Route
                  path="personalInfo"
                  element={<UserCenterInformation />}
                />
                <Route path="dataPrivacy" element={<UserCenterDataPrivacy />} />
                <Route path="safety" element={<UserCenterSafety />} />
                <Route path="userSharing" element={<UserCenterSharing />} />
                <Route
                  path="paySubscribe"
                  element={<UserCenterPaySubscribe />}
                />
                <Route path="about" element={<UserCenterAbout />} />
                <Route path="update-info" element={<UserInfoEditor />} />
              </Route>
              <Route
                path="map"
                element={
                  <MapProvider>
                    <MainMap />
                  </MapProvider>
                }
              >
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
              <Route path="about" element={<AboutRoamSphere />} />
              <Route path="businessContact" element={<BusinessContact />} />
              <Route path="partner" element={<Partners />} />
              <Route path="joinUs" element={<JoinUs />} />
              <Route path="apiDoc" element={<APIDocs />} />
              <Route path="helpCenter" element={<HelpCenter />} />
              <Route path="privacyPolicy" element={<PrivacyPolicy />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Suspense>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
