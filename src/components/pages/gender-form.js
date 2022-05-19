import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { logSurveyResponse, log } from "../../actions/survey-actions";

const defaultValue = null;

class GenderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNextButton: false,
      genderValue: null
    };
  }

  componentDidMount() {
    let date = new Date();
    let configJson = {
      universalTime: date.getTime(),
      timestamp: date.toISOString(),
      action: "LOG_ON_MOUNT_GENDER_FORM",
      state: this.state,
    };
    this.props.log(configJson);
  }

  isValueProvided() {
    if (this.state.genderValue !== defaultValue) {
      return true;
    }
    return false;
  }

  handleChange = (event, value) => {
    this.setState(
      {
        genderValue: event.target.value,
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
      action: "LOG_GENDER_FORM_RESPONSE",
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

  getGenderSelect() {
    return(
      <Box sx={{ minWidth: 80 }}>
      <FormControl fullWidth>
        <Select
          id="gender-select"
          onChange={this.handleChange}
          variant="standard"
        >
          <MenuItem value={"Female"}>Female</MenuItem>
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
          <MenuItem value={"Prefer not to say"}>Prefer not to say</MenuItem>
        </Select>
      </FormControl>
    </Box>
    );
  }3

  render() {
    return (
      <div>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography>What is your gender?</Typography>
            {this.getGenderSelect()}
          </Grid>
        </Grid>

        <Box p={2}>
          {this.state.showNextButton ? <div>{this.getNextButton()}</div> : null}
        </Box>
      </div>
    );
  }
}

GenderForm.propTypes = {
  logSurveyResponse: PropTypes.func.isRequired,
  log: PropTypes.func.isRequired,
};

export default connect(null, {
  logSurveyResponse,
  log,
})(GenderForm);
