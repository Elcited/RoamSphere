import styled from "styled-components";
import ResourceBodyItem from "./ResourceBodyItem";
import useQueryUpdater from "../hooks/useQueryUpdater";

const StyledColumn = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: start;
  align-items: start;
`;

const Title = styled.div`
  font-weight: 500;
  grid-row: 1 / 3;
  padding: 0 1.2em 0;
`;

const ResourceBody = styled.div`
  font-size: 1.2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  row-gap: 1.2rem;
  column-gap: 6.4rem;
  justify-items: center;
  align-items: start;
`;

function ResourceColumn() {
  const { updateQueryAndNavigate } = useQueryUpdater();
  const items = [
    {
      id: 1,
      content: "API文档",
      type: "apiDocs",
      handler: function () {
        updateQueryAndNavigate({}, "/apiDoc", {});
      },
    },
    {
      id: 2,
      content: "帮助中心",
      type: "helpCenter",
      handler: function () {
        updateQueryAndNavigate({}, "/helpCenter", {});
      },
    },
    {
      id: 3,
      content: "隐私政策",
      type: "privacyPolicy",
      handler: function () {
        updateQueryAndNavigate({}, "/privacyPolicy", {});
      },
    },
  ];
  return (
    <StyledColumn>
      <Title>资源</Title>
      <ResourceBody>
        {items.map(item => (
          <ResourceBodyItem
            content={item.content}
            key={item.id}
            handler={item.handler}
          />
        ))}
      </ResourceBody>
    </StyledColumn>
  );
}

export default ResourceColumn;
