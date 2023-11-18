import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

export const MovieCard = ({
  title,
  releaseYear,
  genre,
  voteAvg,
  onShowDetails,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: 400, height: 300, marginBottom: 5 }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          Release Year: {releaseYear}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          Genre: {genre}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          Vote Average: {voteAvg}
        </Typography>
        <Button variant="outlined" color="primary" onClick={onShowDetails}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

// 3. Details View:
//    - When a user clicks on a specific movie or series from the search results, display detailed information about it.
//    - This detail view should include the title, synopsis, release year, genre, and any other relevant information.
//    - Use a modal or a new page to display this information.


