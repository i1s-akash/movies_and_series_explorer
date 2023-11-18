import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

export const FilterGenres = ({ genres, selectGenres }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenreChange = (genre) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((selectedGenre) => selectedGenre !== genre)
      : [...selectedGenres, genre];

    setSelectedGenres(updatedGenres);
    selectGenres(updatedGenres);
  };

  return (
    <Grid item xs={12} sm={4}>
      <Paper style={{ padding: "16px" }}>
        <Typography variant="h6">Filter by Genre</Typography>
        <FormGroup>
          {genres.map((genre) => (
            <FormControlLabel
              key={genre.id}
              control={
                <Checkbox
                  checked={selectedGenres.includes(genre.id)}
                  onChange={() => handleGenreChange(genre.id)}
                />
              }
              label={genre.name}
            />
          ))}
        </FormGroup>
      </Paper>
    </Grid>
  );
};

// 2. Filtering Options:
//    - Allow users to filter results based on genres.
//    - Provide checkboxes or a dropdown menu for selecting genres.
//    - Implement logic to filter the displayed results according to the selected genres.
