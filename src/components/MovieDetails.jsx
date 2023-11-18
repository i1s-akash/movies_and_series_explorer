import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";

const TypoStyle = { fontWeight: "bold", padding: "2px 2px 2px 0" };

export const MovieDetails = ({
  open,
  onClose,
  title,
  synopsis,
  releaseYear,
  genre,
  voteAvg,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="subtitle1"
              style={TypoStyle}
            >
              Release Year: {releaseYear}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              variant="body2"
              style={TypoStyle}
            >
              Genre: {genre}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              variant="body2"
              style={TypoStyle}
            >
              Average Vote: {voteAvg}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2" style={{ padding: "2px 2px 10px 0" }}>
              {synopsis}
            </Typography>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={onClose} fullWidth>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

// 3. Details View:
//    - When a user clicks on a specific movie or series from the search results, display detailed information about it.
//    - This detail view should include the title, synopsis, release year, genre, and any other relevant information.
//    - Use a modal or a new page to display this information.
