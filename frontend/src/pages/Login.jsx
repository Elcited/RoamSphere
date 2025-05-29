import styled from "styled-components";
import LoginForm from "../ui/LoginForm";

const LoginPage = styled.div`
  padding: 1.2rem;
`;

function Login() {
  return (
    <LoginPage>
      <LoginForm />
    </LoginPage>
  );
}

export default Login;
