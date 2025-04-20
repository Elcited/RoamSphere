import styled from "styled-components";

const PanelWrapper = styled.div`
  position: absolute;
  top: 5rem;
  left: 7.5rem;
  width: 24rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
  padding: 1.2rem;
  z-index: 20;
`;

function FloatingInfoPanel({ children }) {
  return <PanelWrapper>{children}</PanelWrapper>;
}

export default FloatingInfoPanel;
