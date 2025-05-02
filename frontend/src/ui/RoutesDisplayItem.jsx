import styled from "styled-components";

const Container = styled.div`
  padding: 0.9rem 1.2rem;
  border-bottom: 1px solid #e3e3e3;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: ${props => props.highlightColor || "blue"};
    border-radius: 2px;
  }
`;

const RouteInfoOverviewBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const RouteInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RouteInfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.span`
  display: inline-block;
`;

const DetailButtonBox = styled.div`
  padding: 0.9rem;
  display: flex;
  justify-content: center;
`;

const DetailButton = styled.button`
  padding: 0.9rem;
`;

function RoutesDisplayItem({ isSelected, handleClick }) {
  return (
    <Container onClick={handleClick}>
      <RouteInfoOverviewBox>
        <RouteInfoBox>
          <RouteInfoItem>
            <Item>XXX</Item>
            <Item>XXX</Item>
          </RouteInfoItem>
          <RouteInfoItem>
            <Item>XXX</Item>
            <Item>XXX</Item>
          </RouteInfoItem>
          <RouteInfoItem>
            <Item>XXX</Item>
            <Item>XXX</Item>
          </RouteInfoItem>
        </RouteInfoBox>
        {isSelected ? (
          <DetailButtonBox>
            <div>
              <DetailButton>详情</DetailButton>
            </div>
          </DetailButtonBox>
        ) : null}
      </RouteInfoOverviewBox>
    </Container>
  );
}

export default RoutesDisplayItem;
