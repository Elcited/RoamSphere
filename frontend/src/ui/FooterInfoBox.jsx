import styled from "styled-components";
import ServiceRow from "./ServiceRow";
import EmailRow from "./EmailRow";
import ContactRow from "./ContactRow";

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5.4rem;
  padding: 2.4rem;
  font-size: 1.2rem;
`;

function FooterInfoBox() {
  return (
    <InfoBox>
      <ServiceRow />
      <EmailRow />
      <ContactRow />
    </InfoBox>
  );
}

export default FooterInfoBox;
