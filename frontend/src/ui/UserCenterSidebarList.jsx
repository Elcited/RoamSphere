import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import useQueryUpdater from "../hooks/useQueryUpdater";

const SidebarList = styled.div`
  color: #333;
  font-size: 1.4rem;
  font-weight: 500;
  border-bottom: 1px solid #eee;
  padding-bottom: 1.2rem;
`;

const SidebarListItem = styled.div`
  padding: 1.2rem;
  border-top-right-radius: 1.2rem;
  border-bottom-right-radius: 1.2rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;

  background-color: ${({ active }) => (active ? "#8cbbe9" : "#fff")};
  cursor: pointer;

  &:hover {
    background-color: #e8f1fb;
  }
`;

const IconItem = styled.div`
  padding: 0.3rem;
  display: flex;
  align-items: center;
`;

const TextItem = styled.div`
  padding: 0.3rem;
`;

function UserCenterSidebarList({ activedItem, setActivedItem }) {
  const { updateQueryAndNavigate } = useQueryUpdater();

  const createHandler = useCallback(
    ({ type }) => {
      return () => {
        updateQueryAndNavigate({}, `/user/${type}`, {
          clearOthers: true,
        });
        setActivedItem(type);
      };
    },
    [updateQueryAndNavigate]
  );

  const listConfigs = useMemo(
    () => [
      {
        label: "首页",
        type: "overview",
        element: <AccountCircleOutlinedIcon fontSize="large" />,
        handler: createHandler({
          type: "overview",
        }),
      },
      {
        label: "个人信息",
        type: "personalInfo",
        element: <BadgeOutlinedIcon fontSize="large" />,
        handler: createHandler({
          type: "personalInfo",
        }),
      },
      {
        label: "数据和隐私设置",
        type: "dataPrivacy",
        element: <ToggleOnOutlinedIcon fontSize="large" />,
        handler: createHandler({ type: "dataPrivacy" }),
      },
      {
        label: "安全",
        type: "safety",
        element: <LockOutlinedIcon fontSize="large" />,
        handler: createHandler({ type: "safety" }),
      },
      {
        label: "用户和分享",
        type: "userSharing",
        element: <GroupOutlinedIcon fontSize="large" />,
        handler: createHandler({ type: "userSharing" }),
      },
      {
        label: "付款和订阅",
        type: "paySubscribe",
        element: <CreditCardOutlinedIcon fontSize="large" />,
        handler: createHandler({ type: "paySubscribe" }),
      },
    ],
    []
  );

  return (
    <SidebarList>
      {listConfigs.map(list => (
        <SidebarListItem
          key={list.type}
          // active={activedItem === list.type}
          onClick={list.handler}
        >
          <IconItem>{list.element}</IconItem>
          <TextItem>{list.label}</TextItem>
        </SidebarListItem>
      ))}
    </SidebarList>
  );
}

export default UserCenterSidebarList;
