import styled from "styled-components";
import { Avatar, Rating, IconButton } from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// ================= Mock 数据 =================
const mockComments = [
  {
    id: 1,
    username: "王小明",
    avatar: "https://i.pravatar.cc/40?img=1",
    rating: 4,
    date: "2025-05-12",
    content: "环境不错，服务态度很好，下次还会再来！",
  },
  {
    id: 2,
    username: "李小红",
    avatar: "https://i.pravatar.cc/40?img=2",
    rating: 5,
    date: "2025-05-10",
    content: "位置方便，周围也有很多吃的，值得推荐。",
  },
];

// ================= 样式 =================
const CommentsWrapper = styled.div`
  padding: 1.2rem;
`;

const CommentTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
  color: #333;
`;

const CommentItem = styled.div`
  display: flex;
  gap: 1.2rem;
  padding: 1.2rem 0;
  border-bottom: 1px solid #f0f0f0;
`;

const AvatarWrapper = styled.div``;

const CommentContent = styled.div`
  flex: 1;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.4rem;
`;

const Username = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  color: #444;
`;

const CommentDate = styled.span`
  font-size: 1.1rem;
  color: #999;
  margin-left: auto;
`;

const CommentText = styled.p`
  font-size: 1.2rem;
  color: #333;
  line-height: 1.5;
  margin: 0.4rem 0 0.6rem 0;
`;

const CommentActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

function PlaceDetailComments() {
  return (
    <CommentsWrapper>
      <CommentTitle>用户评价</CommentTitle>
      {mockComments.map(comment => (
        <CommentItem key={comment.id}>
          <AvatarWrapper>
            <Avatar src={comment.avatar} alt={comment.username} />
          </AvatarWrapper>
          <CommentContent>
            <CommentHeader>
              <Username>{comment.username}</Username>
              <Rating
                name="read-only"
                value={comment.rating}
                readOnly
                size="small"
                precision={0.5}
              />
              <CommentDate>{comment.date}</CommentDate>
            </CommentHeader>
            <CommentText>{comment.content}</CommentText>
            <CommentActions>
              <IconButton size="small" aria-label="like">
                <ThumbUpAltOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" aria-label="more">
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </CommentActions>
          </CommentContent>
        </CommentItem>
      ))}
    </CommentsWrapper>
  );
}

export default PlaceDetailComments;
