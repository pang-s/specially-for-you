import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import { logSurveyResponse, log } from "../../actions/survey-actions";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import TextField from '@mui/material/TextField';
import { styled } from "@mui/material/styles";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#000000",
  }
});

const defaultValue = null;

class RatingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNextButton: false,
      ratingValue: null,
      hoverValue: -1
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
    var newValue = event.target.value-1;
    if(event.type==="click") {
      // clear text field
      newValue = null
    }

    this.setState(
      {
        ratingValue: newValue,
      },
      () => this.renderNextButton()
    );
  };

  handleHover = (event, newHover) => {
    var newValue = newHover;
    this.setState({
      hoverValue: newValue
    });
  };

  isRatingSelected() {
    return(this.state.ratingValue !== null);
  }

  isHoverValueExists() {
    return(this.state.hoverValue !== -1);
  }

  getCurrentRating() {
    return(this.isRatingSelected()
    ? this.state.ratingValue
    : (this.isHoverValueExists() ? this.state.hoverValue-1 : ""));
  }

  getHoverRating() {
    return (
      <div>
        <Box display="flex" m={2}>
          <Typography sx={{ mr: 2 }}>0=Very Poor </Typography>
          <StyledRating
            max={11}
            value={this.hoverValue}
            precision={1}
            onChange={(event, newValue) => {
              this.handleChange(event, newValue);
            }}
            onChangeActive={(event, newHover) => {
              this.handleHover(event, newHover);
            }}
            icon={<CheckCircleOutlineIcon fontSize="medium" />}
            emptyIcon={<CircleOutlinedIcon fontSize="medium" />}
            highlightSelectedOnly
          />
          <Typography sx={{ ml: 2 }}>10=Excellent</Typography>
        </Box>

        <Box display="flex">
          <TextField
          label="Your selected rating"
          value={this.getCurrentRating()}
          InputProps={{
            readOnly: true,
          }}
          size="small"
        />
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
              Please rate the quality of the movie recommendations for your taste.
              <br></br>
            </Typography>
            <Typography>
            Please rate on a scale of 0 to 10, 0 being "Very Poor" and 10 being "Excellent".
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
