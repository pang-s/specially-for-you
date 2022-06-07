import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { MovieCard } from "./movie-card";
import { connect } from "react-redux";
import { movies } from "../main/movies";

class MoviePage extends React.Component {
  render() {
    return (
      <div>
        {/* <Typography variant="h2" gutterBottom>
          Movies
        </Typography> */}
        <Typography variant="h2" align="center" gutterBottom>
          {this.props.isPersonalised
          ? "Movie recommendations for you"
          : "Movie recommendations"}
        </Typography>
        <Typography variant="h5" p={3} align="left">
        Please read the description of each movie, especially if you haven't already seen that movie, and be ready to answer some questions about these movies.
        </Typography>
        <Box
          display="flex"
          sx={{
            // maxWidth: "30cm",
            justifyContent: "center",
            flexWrap: "wrap",
            // justifyContent: "space-evenly",
          }}
        >
          
          {movies.map((m) => (
            <MovieCard
              
              key={m.key}
              image={m.image}
              title={m.name}
              description={m.desc}
            ></MovieCard>
          ))}



        </Box>


        <Box p={2}>{this.props.nextButton}</Box>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    isPersonalised: state.init.isPersonalised,
  };
};

export default connect(mapStateToProps, {})(MoviePage);
