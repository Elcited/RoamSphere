import { Avatar } from "@mui/material";
import styled from "styled-components";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import useAuth from "../features/authentication/useAuth";
import useQueryUpdater from "../hooks/useQueryUpdater";

const InformationWrapper = styled.section`
  width: 100%;
  height: 100%;
  font-size: 1.4rem;
  color: #555;
`;

const InformationHeader = styled.div`
  padding: 0.6rem;
  letter-spacing: 1.2px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InformationTitle = styled.h1`
  font-size: 2.4rem;
  color: #333;
`;

const InformationDescription = styled.div`
  font-size: 1.4rem;
`;

const InformationBody = styled.section`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const InformationBodyTopBox = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  align-items: start;
`;

const InformationBodyTopTextBox = styled.div`
  padding: 0.6rem;
`;

const InformationBodyTitle = styled.div`
  font-size: 2.4rem;
  padding: 0.3rem;
  color: #333;
`;

const InformationBodyText = styled.div`
  font-size: 1.4rem;
  padding: 0.3rem;
  color: #555;
`;

const InformationTopImageBox = styled.div`
  display: flex;
  align-items: center;
`;

const InformationTopImage = styled.image``;

const SpreadInformationWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  border: 2px solid #eee;
  border-radius: 1.2rem;
`;

const SpreadInformationTitle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
  font-size: 2.4rem;
  color: #333;
  padding-bottom: 2.4rem;

  & span {
    display: inline-block;
    font-size: #555;
    font-size: 1.2rem;
  }
`;

const SpreadInformationRow = styled.div`
  font-weight: 500;
  font-size: #555;
  font-size: 1.2rem;
  padding: 2.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;

const RowItem = styled.div`
  padding: 0.3rem;
`;

function UseCenterInformation() {
  const { updateQueryAndNavigate } = useQueryUpdater();
  const { userData } = useAuth();
  const { user } = userData?.data || {};
  console.log("user", user);

  const handleRowClick = (field, label, value) => {
    updateQueryAndNavigate({}, "/user/update-info", {
      state: { field, label, value },
    });
  };

  const baseInfo = [
    {
      title: "个人头像",
      value: <Avatar>{user?.name?.[0] || "U"}</Avatar>,
      description: "添加个人头像来个性化您的账号",
      field: "avatar",
      clickable: false,
    },
    {
      title: "用户名",
      value: user?.name,
      field: "name",
      clickable: true,
    },
    {
      title: "生日",
      value: user?.birthday || "提供您的生日以供个性化展示",
      field: "birthday",
      clickable: true,
    },
    {
      title: "性别",
      value: user?.gender || "未知",
      field: "gender",
      clickable: true,
    },
  ];

  const contactInfo = [
    {
      title: "电子邮箱",
      value: user?.email,
      field: "email",
      clickable: true,
    },
    {
      title: "电话",
      value: user?.phone || "提供联系电话以方便RoamSphere联系您",
      field: "phone",
      clickable: true,
    },
  ];

  const extraInfo = [
    {
      title: "密码",
      value: "管理您在RoamSphere的密码",
      field: "password",
      clickable: true,
    },
  ];

  const renderSection = (title, subtitle, rows) => (
    <SpreadInformationWrapper>
      <SpreadInformationTitle>
        {title}
        <span>{subtitle}</span>
      </SpreadInformationTitle>

      {rows.map((row, idx) => (
        <SpreadInformationRow
          key={idx}
          onClick={
            row.clickable
              ? () => handleRowClick(row.field, row.title, row.value)
              : undefined
          }
          style={{ cursor: row.clickable ? "pointer" : "default" }}
        >
          <RowItem>{row.title}</RowItem>
          <RowItem>{row.description || row.value}</RowItem>
          <RowItem>
            {row.clickable ? (
              <ArrowForwardIosOutlinedIcon fontSize="large" />
            ) : (
              row.value
            )}
          </RowItem>
        </SpreadInformationRow>
      ))}
    </SpreadInformationWrapper>
  );

  return (
    <InformationWrapper>
      <InformationHeader>
        <InformationTitle>个人信息</InformationTitle>
        <InformationDescription>
          您在RoamSphere中的个人信息与偏好设置
        </InformationDescription>
      </InformationHeader>

      <InformationBody>
        <InformationBodyTopBox>
          <InformationBodyTopTextBox>
            <InformationBodyTitle>
              您在RoamSphere中的个人资料信息
            </InformationBodyTitle>
            <InformationBodyText>
              个人信息用于管理这些信息的选项。您可以向他人公开部分信息，以方便他们与您联系。您还可以查询您的个人资料摘要。
            </InformationBodyText>
          </InformationBodyTopTextBox>
          <InformationTopImageBox>
            <InformationTopImage />
          </InformationTopImageBox>
        </InformationBodyTopBox>

        {renderSection(
          "基本信息",
          "您在RoamSphere活动时他人可见的信息",
          baseInfo
        )}
        {renderSection(
          "联系信息",
          "RoamSphere将通过此类信息联系您",
          contactInfo
        )}
        {renderSection(
          "额外信息",
          "您在RoamSphere活动时他人可见的信息",
          extraInfo
        )}
      </InformationBody>
    </InformationWrapper>
  );
}

export default UseCenterInformation;
