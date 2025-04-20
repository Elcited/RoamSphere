import styled from "styled-components";
import Drawer from "@mui/material/Drawer";
import CommentList from "./CommentsList";

const Container = styled.div`
  padding: 0.9rem;
`;

function CommentsDrawer({ drawerOpen, handleCloseDrawer }) {
  return (
    <Container>
      <Drawer
        sx={{
          width: "500px",
        }}
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
      >
        <CommentList />
      </Drawer>
    </Container>
  );
}

export default CommentsDrawer;
