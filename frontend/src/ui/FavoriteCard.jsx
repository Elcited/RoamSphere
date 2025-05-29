import styled from "styled-components";

const Card = styled.div`
  display: flex;
  gap: 12px;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 16px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const Address = styled.p`
  margin: 4px 0;
  color: #555;
`;

const Type = styled.p`
  margin: 4px 0;
  color: #888;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
`;

const Tag = styled.span`
  background-color: #007bff;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
`;

const Time = styled.p`
  font-size: 12px;
  color: #aaa;
  margin-top: 8px;
`;

export default function FavoriteCard({ item }) {
  return (
    <Card>
      <Image
        src={
          item.photo || "https://via.placeholder.com/100x100.png?text=No+Image"
        }
        alt={item.name}
      />
      <Content>
        <Title>{item.name}</Title>
        <Address>{item.address}</Address>
        <Type>{item.type}</Type>
        {item.rating && <p>评分：⭐ {item.rating}</p>}
        {item.cost && <p>人均：¥{item.cost}</p>}
        {item.tags.length > 0 && (
          <TagContainer>
            {item.tags.slice(0, 5).map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagContainer>
        )}
        <Time>收藏时间：{new Date(item.addedAt).toLocaleString()}</Time>
      </Content>
    </Card>
  );
}
