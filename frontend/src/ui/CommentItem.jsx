import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import Chat from "@mui/icons-material/Chat";

const Container = styled.div`
  padding: 1.2rem;
`;

const CommentBox = styled.div`
  display: flex;
`;

const LeftBox = styled.div`
  padding-top: 0.9rem;
`;

const RightBox = styled.div`
  padding: 0.9rem;
  display: flex;
  flex-direction: column;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: start;
  gap: 1.2rem;
`;

const NameBox = styled.div`
  padding: 0.9rem;
`;

const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 0.9rem;
`;

const Comment = styled.p`
  display: inline-block;
`;

const TimeAndOptsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TimeBox = styled.div``;

const ReplyBox = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const OptsBox = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

// function stringToColor(string) {
//   let hash = 0;
//   let i;

//   /* eslint-disable no-bitwise */
//   for (i = 0; i < string.length; i += 1) {
//     hash = string.charCodeAt(i) + ((hash << 5) - hash);
//   }

//   let color = '#';

//   for (i = 0; i < 3; i += 1) {
//     const value = (hash >> (i * 8)) & 0xff;
//     color += `00${value.toString(16)}`.slice(-2);
//   }
//   /* eslint-enable no-bitwise */

//   return color;
// }

// function stringAvatar(name) {
//   return {
//     sx: {
//       bgcolor: stringToColor(name),
//     },
//     children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
//   };
// }

function CommentItem() {
  return (
    <Container>
      <Card>
        <CardContent>
          <CommentBox>
            <LeftBox>
              <Avatar alt="XXX" sizes="large">
                XXX
              </Avatar>
            </LeftBox>
            <RightBox>
              <CommentHeader>
                <NameBox>XXX</NameBox>
              </CommentHeader>
              <CommentBody>
                <Comment>
                  中文测试 Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Accusantium molestias cumque iure quibusdam laboriosam
                  consectetur, perferendis nulla quas officiis excepturi qui
                  reiciendis? Numquam, obcaecati quasi consequatur
                  exercitationem aliquam in id.
                </Comment>
                <TimeAndOptsBox>
                  <TimeBox>20xx年xx月xx日</TimeBox>
                  <ReplyBox>
                    <Chat fontSize="large" />
                  </ReplyBox>
                  <OptsBox>
                    <IconButton>
                      <ThumbUpOffAltIcon fontSize="large" />
                    </IconButton>
                    <IconButton>
                      <ThumbDownOffAltIcon fontSize="large" />
                    </IconButton>
                  </OptsBox>
                </TimeAndOptsBox>
              </CommentBody>
            </RightBox>
          </CommentBox>
        </CardContent>
      </Card>
    </Container>
  );
}

export default CommentItem;

{
  /*  */
}
