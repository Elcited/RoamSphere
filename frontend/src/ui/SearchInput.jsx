import { InputBase, InputAdornment, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { setEnd, setStart } from "../features/routeDetail/routeSlice";
import { clearDrivingRoute } from "../features/drivingRoute/drivingRouteSlice";
import { clearCyclingRoute } from "../features/cyclingRoute/cyclingRouteSlice";
import { clearWalkingRoute } from "../features/walkingRoute/walkingRouteSlice";
import { clearTransitRoute } from "../features/transitRoute/transitRouteSlice";

function SearchInput({
  value,
  onChange,
  placeholder = "搜索 RoamSphere",
  onSearch,
  onClear,
  onFocus,
  sx = {},
  inputRef,
  currentInputRef,
  type,
}) {
  const dispatch = useDispatch();
  // 执行搜索操作
  const handleSearch = () => {
    if (onSearch) onSearch(value);
  };

  const isActive = currentInputRef?.current === type;

  // 清除输入框内容
  const handleCleanInput = () => {
    dispatch(clearDrivingRoute());
    dispatch(clearCyclingRoute());
    dispatch(clearWalkingRoute());
    dispatch(clearTransitRoute());
    if (onClear) onClear();
    onChange?.("");
    if (type === "start") dispatch(setStart(""));
    if (type === "end") dispatch(setEnd(""));

    // 重点：清除当前激活输入框
    if (currentInputRef?.current === type) {
      currentInputRef.current = null;
    }
  };

  const sharedInputStyles = {
    fontSize: "1.4rem",
    height: "50px",
    padding: "0 12px",
    borderRadius: "10px",
    backgroundColor: "white",
    width: "300px",
    boxShadow: isActive
      ? "0 0 0 2px #1976d2 inset" // 蓝色边框表示激活
      : "0 0 0 1px rgba(0,0,0,0.2) inset",
    transition: "box-shadow 0.3s ease",
    ...sx,
  };

  return (
    <InputBase
      inputRef={inputRef}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange?.(e.target.value)} // 更新父组件状态
      inputProps={{
        onFocus,
      }}
      fullWidth={false}
      autoComplete="off"
      sx={sharedInputStyles}
      endAdornment={
        <InputAdornment position="end" sx={{ ml: 1 }}>
          <IconButton onClick={handleSearch}>
            {" "}
            {/* 点击搜索图标 */}
            <SearchIcon />
          </IconButton>
          {value && ( // 只有当输入框有内容时，显示清除按钮
            <IconButton
              onClick={e => {
                e.stopPropagation(); // 阻止事件冒泡，避免触发 input 的 onFocus
                handleCleanInput();
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </InputAdornment>
      }
    />
  );
}

export default SearchInput;
