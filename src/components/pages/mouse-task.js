import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { log } from "../../actions/mouse-actions";
import { MouseSetup } from "./mouse-setup";

const initialSetupIndex = 0;
const activeColour = "lime";
const inactiveColour = "gray";
const numRequiredClicks = 4;
const taskWidth = 36;

const mouseSetups = [
  new MouseSetup(8, 10),
  new MouseSetup(2, 5),
  new MouseSetup(4, 20),
  new MouseSetup(2, 20),
  // new MouseSetup(4, 10), .. ignore duplicate
  new MouseSetup(4, 5),
  new MouseSetup(8, 20),
  new MouseSetup(8, 5),
  new MouseSetup(2, 10)
];

class MouseTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSetupIndex: initialSetupIndex,
      greenOnLeft: true,
      showNextButton: false,
      numClicks: 0,
      trialsDone: 0,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    
    let date = new Date();
    let configJson = {
      universalTime: date.getTime(),
      timestamp: date.toISOString(),
      action: "LOG_ON_MOUNT_MOUSE_TASK",
      state: this.state,
      distance: this.getDistance(),
      width: this.getWidth()
    };
    this.props.log(configJson);
  }

  handleNext = (e) => {
    var date = new Date();
    var formJson = {
      universalTime: date.getTime(),
      timestamp: date.toISOString(),
      action: "LOG_MOUSE_TASK_HANDLE_NEXT",
      state: this.state,
    };
    this.props.log(formJson);

    this.props.handleNext();
  };

  getCurrentMouseSetup() {
    return mouseSetups[this.state.currentSetupIndex];
  }

  getWidth() {
    return this.getCurrentMouseSetup().width;
  }

  getDistance() {
    return this.getCurrentMouseSetup().distance;
  }

  isTrialComplete(numClicks) {
    return numClicks === numRequiredClicks;
  }

  logTrialCompletion() {
    var date = new Date();
    var formJson = {
      universalTime: date.getTime(),
      timestamp: date.toISOString(),
      action: "LOG_MOUSE_TASK_TRIAL_COMPLETE",
      state: this.state,
      distance: this.getDistance(),
      width: this.getWidth()
    };
    this.props.log(formJson);
  }

  setupNewTrial() {
    this.setState((state, props) => ({
      currentSetupIndex: state.currentSetupIndex + 1,
      numClicks: 0,
    }));
  }

  handleTrialCompletion() {
    this.setState((state, props) => ({
      trialsDone: state.trialsDone + 1
    }));

    this.logTrialCompletion();

    if (this.state.trialsDone === mouseSetups.length - 1) {
      var date = new Date();
      var formJson = {
        universalTime: date.getTime(),
        timestamp: date.toISOString(),
        action: "LOG_MOUSE_TASK_HANDLE_NEXT",
        state: this.state,
        distance: this.getDistance(),
        width: this.getWidth()
      };
      this.props.log(formJson);

      this.props.handleNext();
    } else {
      this.setupNewTrial();
    }
  }

  swapTarget() {
    this.setState({
      greenOnLeft: !this.state.greenOnLeft
    });
  }

  logBoxClick(numClicks) {
    var date = new Date();
    var formJson = {
      universalTime: date.getTime(),
      timestamp: date.toISOString(),
      action: "LOG_MOUSE_TASK_BOX_CLICK",
      state: this.state,
      numClicks: numClicks,
      distance: this.getDistance(),
      width: this.getWidth()
    };
    this.props.log(formJson);
  }

  handleBoxClick(e, colour) {
    if (colour === activeColour) {
      var numClicks = this.state.numClicks + 1;
      this.setState({
        numClicks: numClicks,
      });
      this.logBoxClick(numClicks);

      if (this.isTrialComplete(numClicks)) {
        this.handleTrialCompletion();
      }

      this.swapTarget();
    }
  }

  getBox(marginLeft, width, colour) {
    return (
      <Box
        onClick={(e) => this.handleBoxClick(e, colour)}
        sx={{
          marginLeft: marginLeft,
          width: width,
          height: "100%",
          backgroundColor: colour,
        }}
      ></Box>
    );
  }

  showTask() {
    var leftColour = this.state.greenOnLeft ? activeColour : inactiveColour;
    var rightColour = this.state.greenOnLeft ? inactiveColour : activeColour;

    var widthCm = this.getWidth() + "cm";
    var distanceCm = this.getDistance() + "cm";

    return (
      <Box
        sx={{
          width: taskWidth + "cm",
          height: "15cm",
          border: "1px solid lightgray",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        {this.getBox("0cm", widthCm, leftColour)}
        {this.getBox(distanceCm, widthCm, rightColour)}
      </Box>
    );
  }

  render() {
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={3}>
            {this.showTask()}
          </Grid>
        </Grid>

        <Box p={2}>
          {this.state.showNextButton ? <div>{this.getNextButton()}</div> : null}
        </Box>
      </div>
    );
  }
}

MouseTask.propTypes = {
  log: PropTypes.func.isRequired,
};

export default connect(null, {
  log,
})(MouseTask);
