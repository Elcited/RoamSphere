import styled from "styled-components";

import AccountColumn from "./AccountColumn";
import CompanyColumn from "./CompanyColumn";
import ResourceColumn from "./ResourceColumn";

const StyledServiceRow = styled.div`
  font-size: 1.6rem;
  display: flex;
  justify-content: start;
  gap: 4.8rem;
`;

function ServiceRow() {
  return (
    <StyledServiceRow>
      <AccountColumn />
      <CompanyColumn />
      <ResourceColumn />
    </StyledServiceRow>
  );
}

export default ServiceRow;
