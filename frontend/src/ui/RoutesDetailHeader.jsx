import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SyncIcon from "@mui/icons-material/Sync";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import {
  setEnd,
  setStart,
  setStrategy,
} from "../features/routeDetail/routeDetailSlice";
import SearchInput from "./SearchInput";
import useQueryUpdater from "../hooks/useQueryUpdater";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.4rem;
  gap: 1.2rem;
`;

const Header = styled.div`
  display: flex;
  gap: 1.2rem;
  font-size: 2.4rem;
`;

const SelectSubmitBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function RoutesDetailHeader() {
  const { start, end, strategy } = useSelector(store => store.routeDetail);
  const dispatch = useDispatch();

  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");

  const [selectedStrategy, setSelectedStrategy] = useState(2);

  const { updateQueryAndNavigate } = useQueryUpdater();

  useEffect(() => {
    setStartInput(start);
  }, [start]);

  useEffect(() => {
    setEndInput(end);
  }, [end]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(setStart(startInput));
    dispatch(setEnd(endInput));
    dispatch(setStrategy(selectedStrategy));

    updateQueryAndNavigate(
      {
        startLocation: startInput,
        endLocation: endInput,
        strategy: selectedStrategy,
      },
      "/map/routes",
      {
        replace: true,
      }
    );

    console.log("提交表单，更新 Redux");
  };

  const handleSwap = () => {
    setStartInput(endInput);
    setEndInput(startInput);
  };

  const handleSelectChange = e => {
    setSelectedStrategy(e.target.value);
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Header>
        <SearchInput
          value={startInput}
          onChange={setStartInput}
          placeholder="请输入起点"
        />
        <IconButton onClick={handleSwap}>
          <SyncIcon />
        </IconButton>
        <SearchInput
          value={endInput}
          onChange={setEndInput}
          placeholder="请输入终点"
        />
      </Header>
      <SelectSubmitBox>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={selectedStrategy}
            onChange={handleSelectChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={2}>
              <em>综合推荐</em>
            </MenuItem>
            <MenuItem value={33}>躲避拥堵</MenuItem>
            <MenuItem value={34}>高速优先</MenuItem>
            <MenuItem value={35}>不走高速</MenuItem>
            <MenuItem value={36}>少收费</MenuItem>
            <MenuItem value={37}>大路优先</MenuItem>
            <MenuItem value={38}>速度最快</MenuItem>
          </Select>
          <FormHelperText>路线策略</FormHelperText>
        </FormControl>
        <Button type="submit" variant="contained">
          查询路线
        </Button>
      </SelectSubmitBox>
    </Container>
  );
}

export default RoutesDetailHeader;
