import React, { useState, useEffect, useTransition } from "react";
import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import { SearchBar } from "./components/SearchBar";
import { MovieCard } from "./components/MovieCard";
import { MovieDetails } from "./components/MovieDetails";
import { FilterGenres } from "./components/FilterGenres";
import { getGenres, getMovies, resetMovieResults } from "./redux/action";
import { connect } from "react-redux";

export const App = (props) => {
  const [isPending, startTransition] = useTransition();
  const [searchMovieQuery, setSearchMovieQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedGenresName, setSelectedGenresName] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // 6. API Integration:
  // - Integrate with a public API (such as The Movie Database API) to fetch real movie and series data.
  // - Handle API responses and errors gracefully.

  // 7. Styling:
  //  - Use CSS or a CSS pre-processor (like SASS) for styling.
  //  - Optionally, use a UI library like Material-UI or Bootstrap for UI components.

  useEffect(() => {
    props.getGenres();
  }, []);

  useEffect(() => {
    startTransition(() => {
      if (searchMovieQuery || (selectedGenres.length > 0 && searchMovieQuery)) {
        props.getMovies(searchMovieQuery, selectedGenres, currentPage);
      } else {
        props.resetMovieResults();
      }
    });
  }, [searchMovieQuery, selectedGenres, currentPage]);

  useEffect(() => {
    let tempData = [];
    if (props.genres && props.genres?.genres?.length > 0) {
      tempData.push(...props.genres.genres);
    }
    setGenres(tempData);
  }, [props.genres]);

  useEffect(() => {
    let tempData = [];
    let tempGenreName = [];
    let tempTotalPages = 0;
    if (props.movieResults && props.movieResults?.results?.length > 0) {
      tempData.push(...props.movieResults?.results);
      tempGenreName = props.genres.genres
        ?.filter((list) => selectedGenres.includes(list.id))
        .map((list) => list.name);
      tempTotalPages = props.movieResults?.total_pages || 0;
    }
    setSearchResults(tempData);
    setSelectedGenresName(tempGenreName);
    setTotalPages(tempTotalPages);
  }, [props.movieResults]);

  const handleSearchMovies = (searchQuery) => {
    setSearchMovieQuery(searchQuery);
  };

  const handleSelectedGenres = (selGenre) => {
    setSelectedGenres(selGenre);
  };

  const handleShowDetails = (selMovie) => {
    setSelectedMovie(selMovie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  // Pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      props.resetMovieResults();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      props.resetMovieResults();
    }
  };

  return (
    <Container component="main">
      <SearchBar searchMovies={handleSearchMovies} />
      <hr />
      <Grid container spacing={3}>
        <FilterGenres genres={genres} selectGenres={handleSelectedGenres} />
        <Grid item xs={12} sm={8} style={{ height: "700px", overflow: "auto" }}>
          <Grid container spacing={3}>
            {!isPending &&
              searchResults?.length > 0 &&
              searchResults?.map((movie) => (
                <Grid item xs={12} sm={6} md={4} key={movie.id}>
                  <MovieCard
                    title={movie?.title}
                    releaseYear={movie?.release_date?.split("-")[0] || ""}
                    genre={selectedGenresName.join(", ")}
                    voteAvg={movie?.vote_average}
                    onShowDetails={() => handleShowDetails(movie)}
                  />
                </Grid>
              ))}
          </Grid>
          {searchResults.length === 0 && (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <b>Type to search for movies or series</b>
            </div>
          )}
          {searchResults.length > 0 && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous Page
              </button>
              <span style={{ margin: "0 10px" }}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next Page
              </button>
            </div>
          )}
        </Grid>
      </Grid>
      <MovieDetails
        open={Boolean(selectedMovie)}
        onClose={handleCloseDetails}
        title={selectedMovie?.title || ""}
        synopsis={selectedMovie?.overview || ""}
        releaseYear={selectedMovie?.release_date?.split("-")[0] || ""}
        genre={selectedGenresName.join(", ")}
        voteAvg={selectedMovie?.vote_average || ""}
      />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  genres: state.get_genres,
  movieResults: state.get_movie_results,
  loading: state.pending,
});

export default connect(mapStateToProps, {
  getGenres,
  getMovies,
  resetMovieResults,
})(App);

// 4. Responsive Design:
//    - Ensure the application is responsive and provides a good user experience on both desktop and mobile devices.
