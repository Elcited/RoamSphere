import styled from "styled-components";
import UserCenterHeader from "../ui/UserCenterHeader";
import UserCenterSidebar from "../ui/UserCenterSidebar";
import UserCenterContent from "../ui/UserCenterContent";
import { Outlet, useLocation } from "react-router-dom";

const Container = styled.div`
  color: #555;
  background-color: #fff;
`;

const MainSection = styled.div`
  display: flex;
`;

function UserCenter() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Container>
      <UserCenterHeader />
      <MainSection>
        {pathname.includes("update-info") ? (
          <Outlet />
        ) : (
          <>
            <UserCenterSidebar />
            <UserCenterContent>
              <Outlet />
            </UserCenterContent>
          </>
        )}
      </MainSection>
    </Container>
  );
}

export default UserCenter;
