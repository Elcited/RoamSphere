import { forwardRef } from "react";
import styled from "styled-components";
import PlaceDetailComments from "./PlaceDetailComments";

const Section = styled.div`
  margin-bottom: 3rem;
`;

const PlaceDetailCommentsSections = forwardRef((props, ref) => {
  return (
    <Section ref={ref}>
      <PlaceDetailComments />
    </Section>
  );
});

export default PlaceDetailCommentsSections;
