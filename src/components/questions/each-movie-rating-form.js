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
import { goodMovies } from "../main/movies";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const imgWidth = 220 * 0.8;
const imgHeight = 326 * 0.8;

class EachMovieRatingForm extends React.Component {
  constructor(props) {
    super(props);
    const movieLength = goodMovies.length;
    var isSeenArray = new Array(movieLength).fill(null);
    var ratingArray = new Array(movieLength).fill(null);

    this.state = {
      showNextButton: false,
      ratingValue: null,
      hoverValue: null,
      hoverText: null,

      isSeenArray: isSeenArray,
      ratingArray: ratingArray,
    };
  }

  componentDidMount() {
    let date = new Date();
    let configJson = {
      universalTime: date.getTime(),
      timestamp: date.toISOString(),
      action: "LOG_ON_MOUNT_EACH_MOVIE_RATING_FORM",
      state: this.state,
    };
    this.props.log(configJson);
  }

  isFormDone() {
    var hasNullIsSeenArray = this.state.isSeenArray.includes(null);
    var hasNullIsRatingArray = this.state.ratingArray.includes(null);

    if (!hasNullIsSeenArray && !hasNullIsRatingArray) {
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
      action: "LOG_EACH_MOVIE_RATING_FORM_RESPONSE",
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

  handleRadioChange = (event, value, m) => {
    var mIndex = m.key - 1;

    // Shallow copy
    var updatedArray = [...this.state.isSeenArray];
    updatedArray[mIndex] = event.target.value;

    this.setState(
      {
        isSeenArray: updatedArray,
      },
      () => this.renderNextButton()
    );
  };

  handleChange = (event, value, m) => {
    var mIndex = m.key - 1;

    var ratingValue = event.target.value;

    // Shallow copy
    var updatedArray = [...this.state.ratingArray];
    updatedArray[mIndex] = ratingValue;

    this.setState(
      {
        ratingArray: updatedArray,
      },
      () => this.renderNextButton()
    );
  };

  handleHover = (event, ratingValue) => {
    this.setState({
      hoverValue: ratingValue,
    });
  };

  getHoverRating(m) {
    return (
      <div>
        <Box display="flex">
          <Typography sx={{ mr: 2 }}>1=Poor</Typography>
          <Rating
            max={10}
            precision={1}
            onChange={(event, newValue) => {
              this.handleChange(event, newValue, m);
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

  showMovieCard(m) {
    return (
      <Grid item xs={4} p={2} key={"img" + m.key}>
        <img align="right" width={imgWidth} height={imgHeight} src={m.image} alt="" />
      </Grid>
    );
  }

  showMovieQuestion(m) {
    return (
      <Grid item xs={8} p={2} key={"question" + m.key}>
        <Typography variant="h5">
          Have you seen {m.name}?<br></br>
        </Typography>

        <FormControl>
          <RadioGroup onChange={(e, v) => this.handleRadioChange(e, v, m)} row>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <Typography variant="h5">
          <br></br>
          What do you think of this movie recommendation?
        </Typography>
        {this.getHoverRating(m)}
      </Grid>
    );
  }

  showQuestionRow(m) {
    return [this.showMovieCard(m), this.showMovieQuestion(m)];
  }

  render() {
    return (
      <div>
        <Typography variant="h4">Questions</Typography>
        Part 2/3
        <Box
          display="flex"
          sx={{
            flexWrap: "wrap",
          }}
        >

                  <Grid p={2} container>
            {goodMovies.map((m) => this.showQuestionRow(m))}
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

EachMovieRatingForm.propTypes = {
  logSurveyResponse: PropTypes.func.isRequired,
  log: PropTypes.func.isRequired,
};

export default connect(null, {
  logSurveyResponse,
  log,
})(EachMovieRatingForm);
