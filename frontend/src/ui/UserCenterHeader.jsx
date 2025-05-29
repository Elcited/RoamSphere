import styled from "styled-components";
import { useState, useRef } from "react";
import useAuth from "../features/authentication/useAuth";
import gsap from "gsap";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Avatar from "@mui/material/Avatar";
import useLogoutUser from "../features/authentication/useLogoutUser";
import useQueryUpdater from "../hooks/useQueryUpdater";

const UserCenterHeaderWrapper = styled.div`
  padding: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Logos = styled.div`
  font-size: 2.4rem;
`;

const IconBox = styled.div`
  padding: 0.3rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const ActionsBox = styled.div`
  padding: 0.6rem;
  display: flex;
  gap: 2.4rem;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  background: #fff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  border-radius: 1.2rem;
  font-size: 1.6rem;
  padding: 1.6rem;
  min-width: 340px;
  z-index: 20;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-8px);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  text-align: center;
`;

const EmailText = styled.div`
  color: #555;
`;

const WelcomeText = styled.div`
  font-weight: 600;
`;

const DropdownButton = styled.button`
  flex: 1;
  padding: 1.6rem;
  background: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: background 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: ${({ $type }) =>
    $type === "add"
      ? "1.6rem 0 0 1.6rem" // 左圆角
      : $type === "logout"
      ? "0 1.6rem 1.6rem 0" // 右圆角
      : "0"};
  &:hover {
    background: #e0e0e0;
  }
`;

const FooterButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

function UserCenterHeader() {
  const { userData, isAuthenticated } = useAuth();
  const { data: userDataDetail } = userData || {};
  const { user } = userDataDetail || {};
  const menuRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const { mutate: logout } = useLogoutUser();
  const { updateQueryAndNavigate } = useQueryUpdater();

  const showMenu = () => {
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        pointerEvents: "auto",
        ease: "power2.out",
      });
    }
  };

  const hideMenu = () => {
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -8,
        duration: 0.3,
        pointerEvents: "none",
        ease: "power2.in",
      });
    }
  };

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeoutRef.current);
    setHovered(true);
    showMenu();
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHovered(false);
      hideMenu();
    }, 150);
  };

  const handleLogoClick = () => {
    updateQueryAndNavigate({}, "/", {});
  };

  const hanldeAddAccount = () => {
    updateQueryAndNavigate({}, "/login", { clearOthers: true });
  };

  const handleLogout = () => {
    logout();
  };

  const ActionsButtonConfigs = [
    {
      type: "search",
      element: <SearchOutlinedIcon fontSize="large" />,
    },
    {
      type: "help",
      element: <HelpOutlineOutlinedIcon fontSize="large" />,
    },
    {
      type: "avatar",
      element: (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Avatar sx={{ width: 40, height: 40 }} />
          <DropdownMenu ref={menuRef}>
            <UserInfo>
              <EmailText>{user?.email}</EmailText>
              <Avatar sx={{ width: 80, height: 80 }} />
              <WelcomeText>
                {isAuthenticated ? `欢迎您，${user?.name}` : `请先登录`}
              </WelcomeText>
            </UserInfo>
            <FooterButtons>
              <DropdownButton
                $type="add"
                onClick={hanldeAddAccount}
                disabled={isAuthenticated}
              >
                <PersonAddOutlinedIcon fontSize="large" />
                添加账号
              </DropdownButton>
              <DropdownButton $type="logout" onClick={handleLogout}>
                <LogoutOutlinedIcon fontSize="large" />
                退出登录
              </DropdownButton>
            </FooterButtons>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <UserCenterHeaderWrapper>
      <IconBox onClick={handleLogoClick}>
        <Logos>ROAMSPHERE</Logos>
      </IconBox>
      <ActionsBox>
        {ActionsButtonConfigs.map(action => (
          <IconBox key={action.type}>{action.element}</IconBox>
        ))}
      </ActionsBox>
    </UserCenterHeaderWrapper>
  );
}

export default UserCenterHeader;
