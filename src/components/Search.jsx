import React from "react";
import { TextField, withStyles } from "@material-ui/core";
import "./Search.css";

function Search({ keyword, setkeyword, search }) {
  const CssTextField = withStyles({
    root: {
      "& label.Mui-focused": {
        color: "#fff",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "green",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#fff",
        },
        "&:hover fieldset": {
          borderColor: "#246ff2",
        },
        "&.Mui-focused fieldset": {
          borderColor: "green",
        },
        "& .MuiInputBase-input": {
          color: "#fff",
        },
      },
    },
  })(TextField);

  return (
    <div>
      <TextField
        id="outlined-search"
        label="Search City.."
        type="search"
        variant="outlined"
        fullWidth
        value={keyword}
        onChange={(e) => setkeyword(e.target.value)}
        onKeyPress={(e) => search(e)}
        size="small"
        autoFocus
      />
    </div>
  );
}

export default Search;
