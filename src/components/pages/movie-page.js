import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { MovieCard } from "./movie-card";
import { connect } from "react-redux";
import { goodMovies, badMovies } from "../main/movies";

class MoviePage extends React.Component {

  getGoodMovies(){
    return(
      goodMovies.map((m) => (
        <MovieCard
          key={m.key}
          image={m.image}
          title={m.name}
          description={m.desc}
        ></MovieCard>
      ))
    );
  }
  
  getBadMovies(){
    return(
      badMovies.map((m) => (
        <MovieCard
          key={m.key}
          image={m.image}
          title={m.name}
          description={m.desc}
        ></MovieCard>
      ))
    );
  }
  
  render() {
    return (
      <div>
        <Typography variant="h2" align="center" gutterBottom>
        Movie recommendations
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
          
          {this.props.isGood
          ? this.getGoodMovies()
          : this.getBadMovies()}

        </Box>


        <Box p={2}>{this.props.nextButton}</Box>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    isPersonalised: state.init.isPersonalised,
    isGood: state.init.isGood
  };
};

export default connect(mapStateToProps, {})(MoviePage);
