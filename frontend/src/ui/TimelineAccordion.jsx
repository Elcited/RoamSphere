import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr;
  row-gap: 0; /* 或你想要的间距 */
  position: relative;

  /* 这条就是那根贯穿上下的线 */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 12px; /* 刚好在第一列的中点 */
    width: 0;
    border-left: 2px solid #1976d2;
  }
`;

const Header = styled.div`
  grid-column: 2;
  padding: 1rem 0;
  cursor: pointer;
  font-weight: bold;
`;

const List = styled.div`
  grid-column: 2;
  overflow: hidden;
  max-height: ${({ expanded, itemHeight, itemCount }) =>
    expanded ? `${itemHeight * itemCount}px` : `0px`};
  transition: max-height 0.3s ease;
`;

const Item = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 1rem 0;

  /* 这就是每行的“白点” */
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    background: white;
    border: 2px solid #1976d2;
    border-radius: 50%;
  }
`;

function TimelineAccordion({ title, items }) {
  const [open, setOpen] = useState(false);
  const ITEM_HEIGHT = 48; // 你自己测量每行的高度
  return (
    <Container>
      <Header onClick={() => setOpen(o => !o)}>{title}</Header>
      <Header onClick={() => setOpen(o => !o)}>{title}</Header>
      <Header onClick={() => setOpen(o => !o)}>{title}</Header>
      <List expanded={open} itemHeight={ITEM_HEIGHT} itemCount={items.length}>
        {items.map((text, i) => (
          <Item key={i}>{text}</Item>
        ))}
      </List>
    </Container>
  );
}

export default TimelineAccordion;
