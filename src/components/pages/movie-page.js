import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { MovieCard } from "./movie-card";
import { connect } from "react-redux";
import { goodMovies, badMovies } from "../main/movies";
import RatingForm from "../questions/rating-form";
import Divider from "@mui/material/Divider";

class MoviePage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  getGoodMovies() {
    return goodMovies.map((m) => (
      <MovieCard
        key={m.key}
        image={m.image}
        rating={m.rating}
        title={m.name}
        description={m.desc}
      ></MovieCard>
    ));
  }

  getBadMovies() {
    return badMovies.map((m) => (
      <MovieCard
        key={m.key}
        image={m.image}
        rating={m.rating}
        title={m.name}
        description={m.desc}
      ></MovieCard>
    ));
  }

  render() {
    return (
      <div>
        <Typography variant="h2" align="center" gutterBottom>
          Movie recommendations
        </Typography>
        <Typography variant="h5" p={3} align="left">
          Please read the description of each movie, especially if you haven't
          already seen that movie, and be ready to answer some questions about
          these movies.
        </Typography>
        <Box
          display="flex"
          m={4}
          sx={{
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {this.props.isGood ? this.getGoodMovies() : this.getBadMovies()}
        </Box>

        <Divider></Divider>

        <Box m={2}>
          <RatingForm handleNext={this.props.handleNext}></RatingForm>
        </Box>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isPersonalised: state.init.isPersonalised,
    isGood: state.init.isGood,
  };
};

export default connect(mapStateToProps, {})(MoviePage);
