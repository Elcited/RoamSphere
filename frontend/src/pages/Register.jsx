import styled from "styled-components";
import RegisterForm from "../ui/RegisterForm";

const RegisterPage = styled.div`
  padding: 1.2rem;
`;

function Register() {
  return (
    <RegisterPage>
      <RegisterForm />
    </RegisterPage>
  );
}

export default Register;
