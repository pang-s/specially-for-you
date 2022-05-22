import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { log } from "../../actions/mouse-actions";
import { getRandomInt } from "../util";
import { MouseSetup } from "./mouse-setup";

const initialSetupIndex = 0;
const defaultTargetIndex = 0;
const activeColour = "lime";
const disabledColour = "gray";
const blankColour = "white;";

const requiredSuccessfulClicks = 2;
const mouseSetups = [
  new MouseSetup(8, 0), 
  new MouseSetup(6, 1)];

class MouseTask extends React.Component {
  constructor(props) {
    super(props);

    var initialSetup = mouseSetups[initialSetupIndex];

    this.state = {
      currentSetupIndex: initialSetupIndex,
      prevTargetIndex: defaultTargetIndex,
      greenOnLeft: true,
      showNextButton: false,
      numClicks: 0,
      trialsDone: 0,
    };
  }

  componentDidMount() {
    // this.setState({
    //   targetIndex: this.getTargetIndex(),
    // });
    let date = new Date();
    let configJson = {
      universalTime: date.getTime(),
      timestamp: date.toISOString(),
      action: "LOG_ON_MOUNT_MOUSE_TASK",
      state: this.state,
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

  getNextButton() {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => this.handleNext(e)}
      >
        Next
      </Button>
    );
  }

  getCurrentMouseSetup() {
    return mouseSetups[this.state.currentSetupIndex];
  }

  getNumCols() {
    return this.getCurrentMouseSetup().numCols;
  }

  getTargetIndex() {
    return this.getCurrentMouseSetup().targetIndex;
  }

  getRandomTargetIndex() {
    // Gets random index as target (or we can reprogram to be hard coded as well)
    // Get half number of cols e.g. 6 /2 = 3 - 1 = 2 because start at 0
    var midCol = this.getNumCols() / 2 - 1;

    var randomInt = defaultTargetIndex;
    while (randomInt === this.state.prevTargetIndex) {
      randomInt = getRandomInt(0, midCol);
    }

    this.setState({
      prevTargetIndex: randomInt,
    });
    return randomInt;
  }

  getRightTargetIndex() {
    return this.getNumCols() - 1 - this.getTargetIndex();
  }

  isTrialComplete() {
    return this.state.numClicks === requiredSuccessfulClicks;
  }

  logTrialCompletion() {
    var date = new Date();
    var formJson = {
      universalTime: date.getTime(),
      timestamp: date.toISOString(),
      action: "LOG_MOUSE_TASK_TRIAL_COMPLETE",
      state: this.state,
    };
    this.props.log(formJson);
  }

  setupNewTrial() {
    this.setState({
      currentSetupIndex: this.state.currentSetupIndex + 1,
      numClicks: 0
    });
  }

  handleTrialCompletion() {
    this.setState({
      trialsDone: this.state.trialsDone + 1,
    });

    this.logTrialCompletion();

    console.log("this.state.trialsDone", this.state.trialsDone, "mouseSetups.length", mouseSetups.length, this.state)

    if (this.state.trialsDone === mouseSetups.length - 1) {
      var date = new Date();
      var formJson = {
        universalTime: date.getTime(),
        timestamp: date.toISOString(),
        action: "LOG_MOUSE_TASK_HANDLE_NEXT",
        state: this.state,
      };
      this.props.log(formJson);
  
      this.props.handleNext();
    } else {
      this.setupNewTrial()
    }

  }

  swapTarget() {
    this.setState({
      greenOnLeft: !this.state.greenOnLeft,
      targetIndex: this.getTargetIndex(),
    });
  }

  handleBoxClick(e, colour) {
    if (colour === activeColour) {
      this.setState({
        numClicks: this.state.numClicks + 1,
      });

      if (this.isTrialComplete()) {
        this.handleTrialCompletion();
      }

      this.swapTarget();
    }
  }

  getBox(i, colour) {
    return (
      <Box
        onClick={(e) => this.handleBoxClick(e, colour)}
        key={i}
        sx={{ gridRow: "1", border: "1px solid grey", backgroundColor: colour }}
      >
        {/* <Button onClick={(e) => this.handleBoxClick(e)}></Button> */}
      </Box>
    );
  }

  renderBoxes(i) {
    var leftCol = this.getTargetIndex();
    var rightCol = this.getRightTargetIndex();

    var leftColour = this.state.greenOnLeft ? activeColour : disabledColour;
    var rightColour = this.state.greenOnLeft ? disabledColour : activeColour;
    if (i === leftCol) {
      return this.getBox(i, leftColour);
    } else if (i === rightCol) {
      return this.getBox(i, rightColour);
    } else {
      return this.getBox(i, blankColour);
    }
  }

  populateGrid() {
    return [...Array(this.getNumCols())].map((x, i) => this.renderBoxes(i));
  }

  showTask() {
    return (
      <Box
        sx={{
          width: 800,
          height: 500,
          border: "1px solid grey",
          display: "grid",
          gridAutoColumns: "1fr",
        }}
      >
        {this.populateGrid()}
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
