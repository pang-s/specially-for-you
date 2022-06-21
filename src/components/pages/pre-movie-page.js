import * as React from "react";
import Box from "@mui/material/Box";
import { connect } from "react-redux";

import { Typography } from "@mui/material";

export class PreMoviePage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  getPersonalisedText() {
    return (
      <Box p={2}>
        <Typography variant="h5">
          <b>
            Thanks.
            <br></br>
            Based on your answers (about yourself), our system has picked some movies for you.
          </b>
        </Typography>
        <br></br>
        Click "NEXT" to see the list.
      </Box>
    );
  }

  getNonPersonalisedText() {
    return (
      <Box p={2}>
        <Typography variant="h5">
        <b>
          Thanks.
          <br></br>
          Based on your answers (about the average person), our system has picked some movies for you.
        </b>
        </Typography>
        <br></br>
        Click "NEXT" to see the list.
      </Box>
    );
  }

  render() {
    return (
      <div>
        {this.props.isPersonalised
          ? this.getPersonalisedText()
          : this.getNonPersonalisedText()}
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

export default connect(mapStateToProps, {})(PreMoviePage);
