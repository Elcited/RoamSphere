import styled from "styled-components";
import UserCenterSidebarList from "./UserCenterSidebarList";
import UserCenterSidebarAbout from "./UserCenterSidebarAbout";
import { useState } from "react";

const UserCenterSidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

function UserCenterSidebar() {
  const [activedItem, setActivedItem] = useState("overview");

  return (
    <UserCenterSidebarWrapper>
      <UserCenterSidebarList
        activedItem={activedItem}
        setActivedItem={setActivedItem}
      />
      <UserCenterSidebarAbout
        activedItem={activedItem}
        setActivedItem={setActivedItem}
      />
    </UserCenterSidebarWrapper>
  );
}

export default UserCenterSidebar;
