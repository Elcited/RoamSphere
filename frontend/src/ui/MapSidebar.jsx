import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { setIsRoutesDrawerOpen } from "../features/routesDrawer/routesDrawerSlice";
import useQueryUpdater from "../hooks/useQueryUpdater";

const SidebarContainer = styled.div`
  padding: 1.2rem;

  background-color: #f7f7f7;
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  z-index: 1000;
`;

const Siderbar = styled.div`
  width: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
`;

function MapSidebar() {
  const location = useLocation();
  const isRoutesPage = location.pathname.includes("/map/routes");
  const dispatch = useDispatch();
  const { isRoutesDrawerOpen } = useSelector(store => store.routesDrawer);

  const { updateQueryAndNavigate } = useQueryUpdater();

  const handleClickDetail = () => {
    dispatch(setIsRoutesDrawerOpen(true));

    updateQueryAndNavigate({}, "/map/routes/route_overview/route_detail", {
      clearOthers: true,
      replace: true,
    });
  };

  const handleClickSearch = () => {
    dispatch(setIsRoutesDrawerOpen(true));

    updateQueryAndNavigate({}, "/map/routes/route_search", {
      clearOthers: true,
      replace: true,
    });
  };

  return (
    <SidebarContainer>
      <Siderbar>
        <ButtonBox>
          <Button onClick={handleClickDetail}>路线详情</Button>
          <Button onClick={handleClickSearch}>查找路线</Button>
        </ButtonBox>
        <Drawer open={isRoutesDrawerOpen} anchor="left" variant="persistent">
          {isRoutesPage && <Outlet />}
        </Drawer>
      </Siderbar>
    </SidebarContainer>
  );
}

export default MapSidebar;
