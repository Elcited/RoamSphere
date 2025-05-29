import styled, { keyframes } from "styled-components";
import { Loader2 } from "lucide-react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  background-color: #f9fafb;
  color: #3b82f6;
  text-align: center;
  padding: 2rem;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled(Loader2)`
  width: 64px;
  height: 64px;
  animation: ${spin} 1.2s linear infinite;
  margin-bottom: 1rem;
`;

const Text = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2563eb;
`;

export default function LoadingFallback() {
  return (
    <Container>
      <Spinner />
      <Text>页面加载中，请稍候...</Text>
    </Container>
  );
}
