import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import { logSurveyResponse, log } from "../../actions/survey-actions";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { goodMovies, badMovies } from "../main/movies";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import TextField from '@mui/material/TextField';
import { styled } from "@mui/material/styles";

const imgWidth = 220 * 0.8;
const imgHeight = 326 * 0.8;

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#000000",
  }
});

class EachMovieRatingForm extends React.Component {
  constructor(props) {
    super(props);
    const movieLength = goodMovies.length;
    var isSeenArray = new Array(movieLength).fill(null);
    var ratingArray = new Array(movieLength).fill(null);
    var hoverArray = new Array(movieLength).fill(-1);

    this.state = {
      showNextButton: false,

      isSeenArray: isSeenArray,
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

    var ratingValue = event.target.value-1;
    if(event.type==="click") {
      // clear text field
      ratingValue = null
    }

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

  handleHover = (event, newHover, m) => {
    var mIndex = m.key - 1;

    // Shallow copy
    var updatedArray = [...this.state.hoverArray];
    updatedArray[mIndex] = newHover;
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

  getCurrentRating(m) {
    var i = m.key - 1;
    return(this.isRatingSelected(i)
    ? this.state.ratingArray[i]
    : (this.isHoverValueExists(i) ? this.state.hoverArray[i]-1 : ""));
  }

  getHoverRating(m) {
    return (
      <div>
        <Box display="flex" m={2}>
          <Typography sx={{ mr: 2 }}>0=Very Poor</Typography>
          <StyledRating
            max={11}
            precision={1}
            onChange={(event, newValue) => {
              this.handleChange(event, newValue, m);
            }}
            onChangeActive={(event, newHover) => {
              this.handleHover(event, newHover, m);
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
          value={this.getCurrentRating(m)}
          InputProps={{
            readOnly: true,
          }}
          size="small"
        />
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
          Please rate the quality of the movie recommendation for your taste.
        </Typography>
        {this.getHoverRating(m)}
      </Grid>
    );
  }

  showQuestionRow(m) {
    return [this.showMovieCard(m), this.showMovieQuestion(m)];
  }

  getGoodMovies() {
    return(goodMovies.map((m) => this.showQuestionRow(m)));
  }

  getBadMovies() {
    return(badMovies.map((m) => this.showQuestionRow(m)));
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
            {this.props.isGood ? this.getGoodMovies() : this.getBadMovies()}
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

const mapStateToProps = (state) => {
  return {
    isGood: state.init.isGood,
  };
};

export default connect(mapStateToProps, {
  logSurveyResponse,
  log,
})(EachMovieRatingForm);
