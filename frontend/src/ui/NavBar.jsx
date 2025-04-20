import styled from "styled-components";
import Logo from "./Logo";
import MenuLinks from "./MenuLinks";
import AuthButton from "./AuthButton";

const StyledNavBar = styled.div`
  display: flex;
  padding: 0 4.8rem;
  justify-content: space-between;
  align-items: center;
  min-height: 10vh;
`;

function NavBar() {
  return (
    <StyledNavBar>
      <Logo />
      <MenuLinks />
      <AuthButton />
    </StyledNavBar>
  );
}

export default NavBar;
