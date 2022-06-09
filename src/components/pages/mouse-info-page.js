import * as React from "react";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import { Typography } from "@mui/material";

export class MouseInfoPage extends React.Component {
  getPersonalisedText() {
    return (
      <Box p={2}>
        <Typography variant="h5">
        We will ask you to repeat the pointing task. 
        <br></br>
        The pointer acceleration will be different this time.  
        <br></br>
        Based on your pointing performance, our system has adjusted the pointer acceleration for you.
        
        </Typography>
        <br></br>
        Please press "NEXT" when ready.
      </Box>
    );
  }

  getNonPersonalisedText() {
    return (
      <Box p={2}>
        <Typography variant="h5">
        We will ask you to repeat the pointing task. 
        <br></br>
        The pointer acceleration will be different this time.  
        <br></br>
        Based on pointing performance from an average person, our system has the adjusted pointer acceleration. 
        </Typography>        
        <br></br>
        Please press "NEXT" when ready.
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
