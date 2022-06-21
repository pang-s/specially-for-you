import * as React from "react";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import { Typography } from "@mui/material";

export class MouseInfoPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  getPersonalisedText() {
    return (
      <Box p={2}>
        <Typography variant="h5">
        Based on your pointing performance, our system has adjusted the pointer acceleration for you.
        </Typography>
        <br></br>
        Please press "NEXT" to repeat the pointing task.
      </Box>
    );
  }

  getNonPersonalisedText() {
    return (
      <Box p={2}>
        <Typography variant="h5">
        Based on pointing performance from an average person, our system has adjusted pointer acceleration for you. 
        </Typography>        
        <br></br>
        Please press "NEXT" to repeat the pointing task.
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

export default connect(mapStateToProps, {})(MouseInfoPage);
