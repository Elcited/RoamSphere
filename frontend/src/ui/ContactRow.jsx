import styled from "styled-components";

const StyledContactRow = styled.div`
  font-size: 1.6rem;
  display: flex;
  justify-content: start;
  gap: 4.8rem;
`;

const Tilte = styled.div`
  font-weight: 500;
  padding: 0 1.2rem 0;
`;

const AddressBox = styled.div`
  padding: 1.2rem;
  display: flex;
  justify-content: space-between;
  gap: 2.4rem;
`;

const TelephoneBox = styled.div`
  padding: 1.2rem;
  display: flex;
  justify-content: space-around;
  gap: 2.4rem;
`;

function ContactRow() {
  return (
    <StyledContactRow>
      <AddressBox>
        <Tilte>地址</Tilte>
        <p>50 Rue Sainte-Anne 75002 Paris</p>
      </AddressBox>
      <TelephoneBox>
        <Tilte>联系电话</Tilte>
        <p>415-201-6370</p>
      </TelephoneBox>
    </StyledContactRow>
  );
}

export default ContactRow;
