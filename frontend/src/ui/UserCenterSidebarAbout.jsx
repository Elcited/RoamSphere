import styled from "styled-components";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import useQueryUpdater from "../hooks/useQueryUpdater";

const UserCenterSidebarAboutWrapper = styled.div`
  padding: 1.2rem;
  border-top-right-radius: 1.2rem;
  border-bottom-right-radius: 1.2rem;
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-size: 1.4rem;
  color: #333;
  font-weight: 500;

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

function UserCenterSidebarAbout({ activedItem, setActivedItem }) {
  const { updateQueryAndNavigate } = useQueryUpdater();
  const handleClick = () => {
    setActivedItem("about");
    updateQueryAndNavigate({}, "/user/about", { clearOthers: true });
  };

  return (
    <UserCenterSidebarAboutWrapper
      active={activedItem === "about"}
      onClick={handleClick}
    >
      <IconItem>
        <InfoOutlinedIcon fontSize="large" />
      </IconItem>
      <TextItem>
        <span>关于</span>
      </TextItem>
    </UserCenterSidebarAboutWrapper>
  );
}

export default UserCenterSidebarAbout;
