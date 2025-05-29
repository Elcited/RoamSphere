import styled from "styled-components";
import CompanyBodyItem from "./CompanyBodyItem";
import useQueryUpdater from "../hooks/useQueryUpdater";

// const StyledColumn = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 2fr;
//   justify-items: center;
//   align-items: start;
// `;

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

const CompanyBody = styled.div`
  font-size: 1.2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  row-gap: 1.2rem;
  column-gap: 6.4rem;
  justify-items: center;
  align-items: start;
`;

function CompanyColumn() {
  const { updateQueryAndNavigate } = useQueryUpdater();
  const items = [
    {
      id: 1,
      content: "关于RoamShpere",
      type: "about",
      handler: function () {
        updateQueryAndNavigate({}, "/about", {});
      },
    },
    {
      id: 2,
      content: "商业联系",
      type: "businessContact",
      handler: function () {
        updateQueryAndNavigate({}, "/businessContact", {});
      },
    },
    {
      id: 3,
      content: "合作伙伴",
      type: "partner",
      handler: function () {
        updateQueryAndNavigate({}, "/partner", {});
      },
    },
    {
      id: 4,
      content: "加入我们",
      type: "joinUs",
      handler: function () {
        updateQueryAndNavigate({}, "/joinUs", {});
      },
    },
  ];

  return (
    <StyledColumn>
      <Title>公司</Title>
      <CompanyBody>
        {items.map(item => (
          <CompanyBodyItem
            content={item.content}
            key={item.id}
            handler={item.handler}
          />
        ))}
      </CompanyBody>
    </StyledColumn>
  );
}

export default CompanyColumn;
