import styled from "styled-components";
import CurrencyYuanIcon from "@mui/icons-material/CurrencyYuan";
import { TransitCardWrapper } from "./TransitCardWrapper";

const FeeWrapper = styled(TransitCardWrapper)`
  border: none;
  padding: 0.75rem 0rem;
`;

const Row = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

const Label = styled.span`
  font-size: 1.2rem;
  color: #666;
`;

const Amount = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: baseline;
`;

function TransitFee({ transitFee }) {
  return (
    <FeeWrapper>
      <Row>
        <Label>预计费用</Label>
        <Amount>{transitFee}</Amount>
        <IconWrapper>
          <CurrencyYuanIcon fontSize="small" />
        </IconWrapper>
      </Row>
    </FeeWrapper>
  );
}

export default TransitFee;
