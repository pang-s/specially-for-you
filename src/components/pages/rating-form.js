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
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
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
        <Rating
          name="hover-feedback"
          value={this.hoverValue}
          precision={0.5}
          onChange={(event, newValue) => {
            this.handleChange(event, newValue);
          }}
          onChangeActive={(event, newHover) => {
            this.handleHover(event, newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Typography>
          {this.state.hoverValue !== -1 ? this.state.hoverText : this.state.ratingText}
        </Typography>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography>
              What did you think of the movie recommendations?
              <br></br>
              Rate on a scale of zero (Useless) to five (Excellent) how the
              movie recommendations are for you.
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
