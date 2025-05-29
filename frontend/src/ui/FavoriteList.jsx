import { useState, useMemo } from "react";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { MenuItem, Select, CircularProgress } from "@mui/material";
import useToggleFavorite from "../hooks/useToggleFavoritePOI";

const Container = styled.div`
  padding: 20px;
`;

const FilterRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

const CardList = styled.div`
  display: grid;
  gap: 16px;
`;

const Card = styled.div`
  border: 1px solid #e0e0e0;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #fafafa;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const Address = styled.div`
  font-size: 14px;
  color: #666;
`;

const Tag = styled.div`
  font-size: 13px;
  color: #999;
  margin-top: 4px;
`;

const FavoriteBtn = styled(IconButton)`
  color: ${props => (props.favorited ? "#e53935" : "#bdbdbd")};
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${props => (props.favorited ? "#c62828" : "#757575")};
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #888;
  padding: 2rem;
  font-size: 16px;
`;

const FavoriteList = ({ data }) => {
  const [filter, setFilter] = useState("all");
  const [favorites, setFavorites] = useState(
    () =>
      data?.favorites?.map(f => ({
        id: f.refType === "ExternalPOI" ? f.poiId : f._id,
        active: true,
        refType: f.refType,
      })) || []
  );
  const { mutate: toggleFavorite, isLoading } = useToggleFavorite();

  const filteredData = useMemo(() => {
    if (!data?.favorites) return [];
    if (filter === "all") return data.favorites;
    return data.favorites.filter(item => {
      if (filter === "景点") return item.refType === "Attraction";
      if (filter === "酒店") return item.refType === "Hotel";
      if (filter === "餐饮") return item.refType === "ExternalPOI";
      return true;
    });
  }, [filter, data]);

  const isFavorited = id => favorites?.find(f => f.id === id)?.active;

  const handleToggle = item => {
    const id = item.refType === "ExternalPOI" ? item.poiId : item._id;

    setFavorites(prev =>
      prev.map(f => (f.id === id ? { ...f, active: !f.active } : f))
    );

    toggleFavorite(
      {
        poiId: id,
        refType: item.refType,
        isCurrentlyFavorited: true,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["currentUser", "favorites"]);
        },
      }
    );
  };

  return (
    <Container>
      {isLoading ? (
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      ) : (
        <>
          <FilterRow>
            <Select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              size="small"
            >
              <MenuItem value="all">全部</MenuItem>
              <MenuItem value="景点">景点</MenuItem>
              <MenuItem value="酒店">酒店</MenuItem>
              <MenuItem value="餐饮">餐饮</MenuItem>
            </Select>
          </FilterRow>

          {filteredData?.length === 0 ? (
            <EmptyState>暂无收藏内容</EmptyState>
          ) : (
            <CardList>
              {filteredData.map(item => {
                const id =
                  item.refType === "ExternalPOI" ? item.poiId : item._id;
                return (
                  <Card key={id}>
                    <Info>
                      <Name>{item.name}</Name>
                      <Address>{item.address}</Address>
                      <Tag>
                        {item.business?.rectag || item.type || "未知类型"}
                      </Tag>
                    </Info>
                    <Tooltip title={isFavorited(id) ? "取消收藏" : "收藏"}>
                      <FavoriteBtn
                        favorited={isFavorited(id) ? 1 : 0}
                        onClick={() => handleToggle(item)}
                      >
                        {isFavorited(id) ? (
                          <FavoriteIcon />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </FavoriteBtn>
                    </Tooltip>
                  </Card>
                );
              })}
            </CardList>
          )}
        </>
      )}
    </Container>
  );
};

export default FavoriteList;
