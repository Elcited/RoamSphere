import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AlertTriangle } from "lucide-react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 2rem;
  text-align: center;
`;

const Icon = styled(AlertTriangle)`
  width: 80px;
  height: 80px;
  color: #ef4444;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0.75rem;
`;

const Message = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.85rem 2.5rem;
  font-size: 1.15rem;
  border-radius: 0.75rem;
  cursor: pointer;
  border: none;
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
  background: linear-gradient(135deg, #4f46e5, #3b82f6);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #4338ca, #2563eb);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
  }

  ${props =>
    props.variant === "outline" &&
    `
    background: transparent;
    color: #4f46e5;
    border: 2px solid #4f46e5;
    box-shadow: none;

    &:hover {
      background: #4f46e5;
      color: white;
      box-shadow: 0 4px 15px rgba(79, 70, 229, 0.6);
    }
  `}
`;

function Error() {
  const navigate = useNavigate();

  return (
    <Container>
      <Icon />
      <Title>页面出错啦</Title>
      <Message>可能是链接有误，或页面暂时无法访问。</Message>
      <ButtonGroup>
        <Button variant="outline" onClick={() => navigate(-1)}>
          返回上一页
        </Button>
        <Button onClick={() => navigate("/")}>回到首页</Button>
      </ButtonGroup>
    </Container>
  );
}

export default Error;
