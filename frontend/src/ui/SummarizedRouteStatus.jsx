import styled from "styled-components";

const Wrapper = styled.div`
  color: #555;
  font-size: 1.4rem;
`;

const SummarizedText = styled.div`
  display: flex;
  justify-content: center;
  color: ${({ summarizedStatus }) => {
    summarizedStatus?.includes("畅通") ? "#27ae60" : "#e67e22";
  }};
`;

function SummarizedRouteStatus({
  summarizedStatus,
  walkDescription,
  travelMode,
}) {
  return (
    <Wrapper>
      {travelMode === "driving" ? (
        <SummarizedText
          summarizedStatus={summarizedStatus}
          travelMode={travelMode}
        >
          {summarizedStatus}
        </SummarizedText>
      ) : (
        <SummarizedText
          summarizedStatus={walkDescription}
          travelMode={travelMode}
        >
          {walkDescription}
        </SummarizedText>
      )}
    </Wrapper>
  );
}

export default SummarizedRouteStatus;
