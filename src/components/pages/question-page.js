import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { logQuestionResponse, log } from "../../actions/questions-actions";
import { LOG_QUESTION_RESPONSE } from "../../actions/types";

const defaultRadioValue = "";
const radioOptions = [
  {
    value: 1,
    label: "Strongly disagree",
  },
  {
    value: 2,
    label: "Disagree",
  },
  {
    value: 3,
    label: "Neither agree nor disagree",
  },
  {
    value: 4,
    label: "Agree",
  },
  {
    value: 5,
    label: "Strongly agree",
  },
];

class QuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNextButton: false,
      questionNumber: null,
      questionText: null,
      radioValue: defaultRadioValue,
      radioLabel: null,
    };
  }

  componentDidMount() {
    let date = new Date();
    let configJson = {
      universalTime: date.getTime(),
      timestamp: date.toISOString(),
      action: "LOG_ON_MOUNT_QUESTION_PAGE",
      message: this.props.text,
      questionNumber: this.props.questionNumber,
      questionText: this.props.questionText,
      state: this.state,
    };
    this.props.log(configJson);

    this.setState({
      questionNumber: this.props.questionNumber,
      questionText: this.props.questionText,
    });
  }

  isRadioSelected() {
    if (this.state.radioValue !== defaultRadioValue) {
      return true;
    }
    return false;
  }

  handleRadioChange = (event, value) => {
    const radioValue = parseInt(value, 10);
    var option = radioOptions.find((o) => o.value === radioValue);
    var label = option.label;
    this.setState(
      {
        radioValue: event.target.value,
        radioLabel: label,
        questionNumber: this.props.questionNumber,
        questionText: this.props.questionText,
      },
      () => this.renderNextButton()
    );
  };

  renderNextButton() {
    if (this.isRadioSelected()) {
      this.setState({
        showNextButton: true,
      });
    } else {
      this.setState({
        showNextButton: false,
      });
    }
  }

  handleNext = (event, text, curr = null) => {
    this.setState({
      showNextButton: false,
      radioValue: defaultRadioValue,
      radioLabel: null,
    });

    var date = new Date();
    var formJson = {
      universalTime: date.getTime(),
      timestamp: date.toISOString(),
      action: LOG_QUESTION_RESPONSE,
      state: this.state,
    };
    this.props.logQuestionResponse(formJson);

    this.props.handleNext();
  };

  getNextButton() {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => this.handleNext(e, this.props.questionText)}
      >
        Next
      </Button>
    );
  }

  render() {
    return (
      <div>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography>Question {this.props.questionNumber}/30</Typography>
            <Typography>{this.props.questionText}</Typography>
            <RadioGroup
              name={this.props.questionNumber}
              onChange={(e, v) => this.handleRadioChange(e, v)}
              value={this.state.radioValue}
            >
              {radioOptions.map((o) => (
                <FormControlLabel
                  key={o.value}
                  value={o.value}
                  control={<Radio />}
                  labelPlacement="end"
                  label={o.label}
                />
              ))}
            </RadioGroup>
          </Grid>
        </Grid>
        <Box p={2}>
          {this.state.showNextButton ? <div>{this.getNextButton()}</div> : null}
        </Box>
      </div>
    );
  }
}

QuestionPage.propTypes = {
  logQuestionResponse: PropTypes.func.isRequired,
  log: PropTypes.func.isRequired,
};

export default connect(null, {
  logQuestionResponse,
  log,
})(QuestionPage);
