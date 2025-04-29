import styled from "styled-components";
import CommentItem from "./CommentItem";
import TextField from "@mui/material/TextField";

const Container = styled.div`
  width: 30vw;
  display: flex;
  flex-direction: column;
  padding: 0.9rem;
`;

const CommentListHeader = styled.div`
  padding: 1.2rem;
`;

const CommentListBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentListBodyHeader = styled.div`
  padding: 1.2rem;
  font-size: 2.4rem;
`;

function CommentsList() {
  return (
    <Container>
      <CommentListHeader>
        <TextField
          label="写下您对此景点的看法"
          variant="outlined"
          placeholder="写下您的评论"
          fullWidth
        />
      </CommentListHeader>
      <CommentListBody>
        <CommentListBodyHeader>评论区</CommentListBodyHeader>
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </CommentListBody>
    </Container>
  );
}

export default CommentsList;
