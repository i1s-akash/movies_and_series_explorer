import React, { useRef, useState } from "react";
import { TextField, Grid } from "@mui/material";

export const SearchBar = ({ searchMovies }) => {
  let timer = useRef(); //For debouncing
  const [value, setValue] = useState("");

  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      <Grid item xs={12} md={12}>
        <TextField
          label="Search for movies or series"
          variant="outlined"
          fullWidth
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            clearTimeout(timer.current);
            timer.current = setTimeout(() => {
              searchMovies(e.target.value);
            }, 1000);
          }}
          size="small"
        />
      </Grid>
    </Grid>
  );
};

// 1. Search Functionality:
//    - Implement a search bar where users can enter the name of a movie or series.
//    - Display search results dynamically as the user types.
//    - Include debouncing to optimize performance during search.
