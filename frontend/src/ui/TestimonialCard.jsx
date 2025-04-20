import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  min-width: 100%;
  padding: 2.4rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

function TestimonialCard({ name, comment }) {
  return (
    <Card>
      <h3>{name}</h3>
      <p>{comment}</p>
    </Card>
  );
}

export default TestimonialCard;
