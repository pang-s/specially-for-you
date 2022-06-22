import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import { logSurveyResponse, log } from "../../actions/survey-actions";
import { surveyQuestions } from "../main/questions";
import { styled } from "@mui/material/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import TextField from '@mui/material/TextField';

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#000000",
  }
});

class MovieSurveyForm extends React.Component {
  constructor(props) {
    super(props);
    const numQuestions = surveyQuestions.length;
    var ratingArray = new Array(numQuestions).fill(null);
    var hoverArray = new Array(numQuestions).fill(-1);

    this.state = {
      showNextButton: false,
      ratingArray: ratingArray,
      hoverArray: hoverArray,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let date = new Date();
    let configJson = {
      universalTime: date.getTime(),
      timestamp: date.toISOString(),
      action: "LOG_ON_MOUNT_MOVIE_SURVEY_FORM",
      state: this.state,
    };
    this.props.log(configJson);
  }

  isFormDone() {
    var hasNullIsRatingArray = this.state.ratingArray.includes(null);

    if (!hasNullIsRatingArray) {
      return true;
    }
    return false;
  }

  renderNextButton() {
    if (this.isFormDone()) {
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
      action: "LOG_MOVIE_SURVEY_FORM_RESPONSE",
      state: this.state,
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

  handleChange = (event, value, i) => {
    var ratingValue = event.target.value - 1;
    if(event.type==="click") {
      // clear text field
      ratingValue = null
    }
    // Shallow copy
    var updatedArray = [...this.state.ratingArray];
    updatedArray[i] = ratingValue;

    this.setState(
      {
        ratingArray: updatedArray,
      },
      () => this.renderNextButton()
    );
  };

  setHover = (newHover, i) => {
    // Shallow copy
    var updatedArray = [...this.state.hoverArray];
    updatedArray[i] = newHover;
    this.setState(
      {
        hoverArray: updatedArray,
      },
      () => this.renderNextButton()
    );
  };

  isRatingSelected(i) {
    return(this.state.ratingArray[i] !== null);
  }

  isHoverValueExists(i) {
    return(this.state.hoverArray[i] !== -1);
  }

  getCurrentRating(i) {
    return(this.isRatingSelected(i)
    ? this.state.ratingArray[i]
    : (this.isHoverValueExists(i) ? this.state.hoverArray[i] - 1 : ""));
  }

  getHoverRating(i) {
    return (
      <div>
        <Box display="flex">
          <Typography sx={{ mr: 2 }}>0=Strongly disagree</Typography>
          <StyledRating
            max={11}
            precision={1}
            onChange={(event, newValue) => {
              this.handleChange(event, newValue, i);
            }}
            onChangeActive={(event, newHover) => {
              this.setHover(newHover, i);
            }}
            icon={<CheckCircleOutlineIcon fontSize="medium" />}
            emptyIcon={<CircleOutlinedIcon fontSize="medium" />}
            highlightSelectedOnly
          />
          <Typography sx={{ ml: 2 }}>10=Strongly agree</Typography>
        </Box>
        <br></br>


        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <TextField
          label="Your selected rating"
          value={this.getCurrentRating(i)}
          InputProps={{
            readOnly: true,
          }}
          size="small"
        />
        </Box>
      </div>
    );
  }

  showQuestionRow(question, i) {
    return (
      <Grid item xs={12} p={2} key={i}>
        <Typography variant="h6">
          <br></br>
          {question}
        </Typography>
        {this.getHoverRating(i)}
      </Grid>
    );
  }

  render() {
    return (
      <div>
        <Typography variant="h4">Questions</Typography>
        Part 3/3
        <Box
          display="flex"
          sx={{
            flexWrap: "wrap",
          }}
        >
          <Grid p={2} container>
            <Grid item xs={12}>
              <Typography variant="h5">
                For each statement below, please rate on a scale of 0 to 10,
                where 0 means "Strongly Disagree" and 10 means "Strongly Agree".
              </Typography>
            </Grid>
            {surveyQuestions.map((question, index) =>
              this.showQuestionRow(question, index)
            )}
          </Grid>

          <Box p={2}>
            {this.state.showNextButton ? (
              <div>{this.getNextButton()}</div>
            ) : null}
          </Box>
        </Box>
      </div>
    );
  }
}

MovieSurveyForm.propTypes = {
  logSurveyResponse: PropTypes.func.isRequired,
  log: PropTypes.func.isRequired,
};

export default connect(null, {
  logSurveyResponse,
  log,
})(MovieSurveyForm);
