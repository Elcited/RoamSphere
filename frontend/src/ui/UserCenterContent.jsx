import styled from "styled-components";
import useAuth from "../features/authentication/useAuth";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const UserCenterContentWrapper = styled.div`
  padding: 1.2rem;
  display: flex;
  flex: 1;
  justify-content: center;
  margin-left: 15rem;
  margin-right: 20rem;
`;

const AuthPromptWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  margin-top: 8rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fdfdfd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const PromptText = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #555;
`;

function UserCenterContent({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated)
    return (
      <UserCenterContentWrapper>
        <AuthPromptWrapper>
          <LockIcon color="primary" sx={{ fontSize: 48 }} />
          <PromptText>请先登录后再访问此页面</PromptText>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "1.6rem" }}
            onClick={() => navigate("/login")}
          >
            去登录
          </Button>
        </AuthPromptWrapper>
      </UserCenterContentWrapper>
    );

  return <UserCenterContentWrapper>{children}</UserCenterContentWrapper>;
}

export default UserCenterContent;
