import React from "react";
import { TextField } from "@mui/material";

function SearchInput({
  value,
  onChange,
  onEnter,
  label,
  placeholder,
  sx = {},
}) {
  const handleKeyDown = e => {
    if (e.key === "Enter" && onEnter) {
      onEnter(e.target.value);
    }
  };

  return (
    <TextField
      variant="standard"
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      onKeyDown={handleKeyDown}
      slotProps={{
        input: {
          sx: {
            fontSize: "1.4rem",
            height: "50px",
            padding: "0 12px",
          },
        },
      }}
      sx={{
        width: "220px",
        backgroundColor: "white",
        borderRadius: "10px",
        ...sx,
      }}
    />
  );
}

export default SearchInput;
