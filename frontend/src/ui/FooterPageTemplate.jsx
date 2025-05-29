import styled from "styled-components";

const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #222;
`;

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
  white-space: pre-wrap;
`;

export default function FooterPageTemplate({ title, children }) {
  return (
    <Container>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </Container>
  );
}
