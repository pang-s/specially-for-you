import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { logSurveyResponse, log } from "../../actions/survey-actions";

const defaultValue = null;
const labels = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10",
};

class RatingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNextButton: false,
      ratingValue: null,
      ratingText: null,
      hoverValue: null,
      hoverText: null,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let date = new Date();
    let configJson = {
      universalTime: date.getTime(),
      timestamp: date.toISOString(),
      action: "LOG_ON_MOUNT_RATING_FORM",
      state: this.state,
    };
    this.props.log(configJson);
  }

  isValueProvided() {
    if (this.state.ratingValue !== defaultValue) {
      return true;
    }
    return false;
  }

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
      action: "LOG_RATING_FORM_RESPONSE",
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

  handleChange = (event, value) => {
    var ratingValue = event.target.value;
    var ratingText = labels[ratingValue];

    this.setState(
      {
        ratingValue: ratingValue,
        ratingText: ratingText,
      },
      () => this.renderNextButton()
    );
  };

  handleHover = (event, ratingValue) => {
    var ratingText = labels[ratingValue];

    this.setState({
      hoverValue: ratingValue,
      hoverText: ratingText,
    });
  };

  getHoverRating() {
    return (
      <div>
        <Box display="flex">
          <Typography sx={{ mr: 2 }}>1=Poor </Typography>
          <Rating
            max={10}
            // name="hover-feedback"
            value={this.hoverValue}
            precision={1}
            onChange={(event, newValue) => {
              this.handleChange(event, newValue);
            }}
            onChangeActive={(event, newHover) => {
              this.handleHover(event, newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <Typography sx={{ ml: 2 }}>10=Excellent</Typography>
        </Box>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Typography variant="h4">Questions</Typography>
        Part 1/3
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h5">
              What did you think of the quality of the movie recommendations?
              <br></br>
            </Typography>
            <Typography>
            Please rate on a scale of 1 to 10, 1 being "Poor" and 10 being "Excellent".
            </Typography>
            {this.getHoverRating()}
          </Grid>
        </Grid>

        <Box p={2}>
          {this.state.showNextButton ? <div>{this.getNextButton()}</div> : null}
        </Box>
      </div>
    );
  }
}

RatingForm.propTypes = {
  logSurveyResponse: PropTypes.func.isRequired,
  log: PropTypes.func.isRequired,
};

export default connect(null, {
  logSurveyResponse,
  log,
})(RatingForm);
