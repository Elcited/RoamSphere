import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { setIsRoutesDrawerOpen } from "../features/routesDrawer/routesDrawerSlice";

const SidebarContainer = styled.div`
  padding: 1.2rem;
  background-color: #f7f7f7;
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const Siderbar = styled.div`
  width: 5rem;
  display: flex;
  flex-direction: column;
`;

function MapSidebar() {
  const location = useLocation();
  const isRoutesPage = location.pathname.includes("/map/routes");
  const dispatch = useDispatch();
  const { isRoutesDrawerOpen } = useSelector(store => store.routesDrawer);

  useEffect(() => {
    const url_mode = location.pathname.split("/").pop();
    if (["route", "hotel", "attraction", "custom"].includes(url_mode)) {
      dispatch(setMapMode(url_mode));
    }
  }, [location.pathname]);

  return (
    <SidebarContainer>
      <Siderbar>
        <Button onClick={() => dispatch(setIsRoutesDrawerOpen(true))}>
          路线详情
        </Button>
        <Drawer open={isRoutesDrawerOpen} anchor="left" variant="persistent">
          {isRoutesPage && <Outlet />}
        </Drawer>
      </Siderbar>
    </SidebarContainer>
  );
}

export default MapSidebar;
