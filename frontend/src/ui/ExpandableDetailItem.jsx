import { useState } from "react";
import styled from "styled-components";
import { Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PlaceOpenStatus from "./PlaceOpenStatus";

const DetailListItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.4rem;
  padding: 0 1.2rem;
`;

const DetailListItemIcon = styled.div`
  padding: 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
`;

const DetailListItemTextWrapper = styled.div`
  flex: 1;
  padding: 0.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LabelText = styled.div`
  font-size: 1.2rem;
  display: flex;
  gap: 1.2rem;
`;

const ExtraText = styled.div`
  font-size: 1.1rem;
  padding-top: 0.4rem;
`;

const StyledIconButton = styled(IconButton)`
  padding: 0.2rem;
`;

const ExpandableDetailItem = ({ icon, label, extra, type }) => {
  const [expanded, setExpanded] = useState(false);
  const isExpandable = !!extra;

  return (
    <DetailListItem>
      <DetailListItemIcon>{icon}</DetailListItemIcon>
      <DetailListItemTextWrapper>
        <LabelRow>
          <LabelText>
            {type === "accessTime" && <PlaceOpenStatus opentime={label} />}{" "}
            {label}
          </LabelText>
          {isExpandable && (
            <StyledIconButton onClick={() => setExpanded(prev => !prev)}>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </StyledIconButton>
          )}
        </LabelRow>
        {isExpandable && (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <ExtraText>{extra}</ExtraText>
          </Collapse>
        )}
      </DetailListItemTextWrapper>
    </DetailListItem>
  );
};

export default ExpandableDetailItem;
