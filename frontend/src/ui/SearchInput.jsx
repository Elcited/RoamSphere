import React from "react";
import { InputBase, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

function SearchInput({
  value,
  onChange,
  onEnter,
  onSearch,
  onClear,
  placeholder = "搜索 RoamSphere",
  sx = {},
  inputRef,
}) {
  const handleKeyDown = e => {
    if (e.key === "Enter" && onEnter) {
      onEnter(e.target.value);
    }
  };

  const handleSearch = () => {
    if (onSearch) onSearch(value);
  };

  const handleCleanInput = () => {
    if (onClear) onClear();
    onChange?.("");
  };

  const sharedInputStyles = {
    fontSize: "1.4rem",
    height: "50px",
    padding: "0 12px",
    borderRadius: "10px",
    backgroundColor: "white",
    width: "300px",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.2) inset",
    ...sx,
  };

  return (
    <InputBase
      inputRef={inputRef}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      onKeyDown={handleKeyDown}
      fullWidth={false}
      sx={sharedInputStyles}
      endAdornment={
        <InputAdornment position="end" sx={{ ml: 1 }}>
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
          {value && (
            <IconButton onClick={handleCleanInput}>
              <CloseIcon />
            </IconButton>
          )}
        </InputAdornment>
      }
    />
  );
}

export default SearchInput;
