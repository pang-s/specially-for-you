import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { logSurveyResponse, log } from "../../actions/survey-actions";

const defaultAgeValue = null;

class AgeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNextButton: false,
      ageValue: null
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    let date = new Date();
    let configJson = {
      universalTime: date.getTime(),
      timestamp: date.toISOString(),
      action: "LOG_ON_MOUNT_AGE_FORM",
      state: this.state,
    };
    this.props.log(configJson);
  }

  isValueProvided() {
    if (this.state.ageValue !== defaultAgeValue) {
      return true;
    }
    return false;
  }

  handleChange = (event, value) => {
    this.setState(
      {
        ageValue: event.target.value,
      },
      () => this.renderNextButton()
    );
  };

  renderNextButton() {
    if (this.isValueProvided()) {
      this.setState({
        showNextButton: true,
      });
    } else {
      this.setState({
        showNextButton: false,
      });
    }
  }

  handleNext = (e) => {
    var date = new Date();
    var formJson = {
      universalTime: date.getTime(),
      timestamp: date.toISOString(),
      action: "LOG_AGE_FORM_RESPONSE",
      state: this.state
    };
    this.props.logSurveyResponse(formJson);

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

  render() {
    return (
      <div>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h5">What is your age?</Typography>
            <TextField
              // required
              id="age"
              name="age"
              // label="Age"
              fullWidth
              type="number"
              //autoComplete="given-name"
              variant="standard"
              onChange={(e, v) => this.handleChange(e, v)}
            />
          </Grid>
        </Grid>

        <Box p={2}>
          {this.state.showNextButton ? <div>{this.getNextButton()}</div> : null}
        </Box>
      </div>
    );
  }
}

AgeForm.propTypes = {
  logSurveyResponse: PropTypes.func.isRequired,
  log: PropTypes.func.isRequired,
};

export default connect(null, {
  logSurveyResponse,
  log,
})(AgeForm);
