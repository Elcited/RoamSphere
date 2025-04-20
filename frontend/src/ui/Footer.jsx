import styled from "styled-components";

import FooterGridBox from "./FooterGridBox";
import FooterInfoBox from "./FooterInfoBox";
import ScrollUpButton from "./ScrollUpButton";

const FooterContainer = styled.footer`
  padding: 4.8rem 0 9.6rem 0;
  background-color: #ffffff;
  border-top: 1px solid #eee;
`;

const footerData = [{}, {}, {}, {}, {}];

function Footer() {
  return (
    <FooterContainer>
      <FooterGridBox>
        <FooterInfoBox></FooterInfoBox>
        <ScrollUpButton></ScrollUpButton>
      </FooterGridBox>
    </FooterContainer>
  );
}

export default Footer;
