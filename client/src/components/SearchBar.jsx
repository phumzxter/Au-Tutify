import React, { useState } from "react";
import { IconButton, TextField, InputAdornment } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
const SearchBar = (props) => {
  const [showClearIcon, setShowClearIcon] = useState("hidden");
  const [inputText, setInputText] = useState("");

  const handleChange = (event) => {
    setShowClearIcon(event.target.value === "" ? "hidden" : "visible");
    const newValue = event.target.value;
    setInputText(newValue);
  };

  const handleClick = () => {
    setInputText("");
    setShowClearIcon("hidden");
  };
  function keyPress(event) {
    if (event.keyCode == "Enter") {
      // props.addFunc();
    }
  }

  //   function handleChange(e) {
  //     // props.changeFunc(e);
  //   }

  return (
    <TextField
      sx={{ marginBottom: 3 }}
      size="small"
      variant="outlined"
      onChange={handleChange}
      onKeyDown={keyPress}
      value={inputText}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end" sx={{ visibility: showClearIcon }} onClick={handleClick}>
            <IconButton>
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
