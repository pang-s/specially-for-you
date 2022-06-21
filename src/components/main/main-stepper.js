import { StarterBox } from "../box-styles/starter-box";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IntroPage from "../pages/intro-page";
import { Page } from "./page";
import { QontoConnector, QontoStepIcon } from "./qonto-connector";
import { setActiveStep } from "../../actions/init-actions.js";
import QuestionPage from "../pages/question-page";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import MoviePage from "../pages/movie-page";
import AgeForm from "../pages/age-form";
import GenderForm from "../pages/gender-form";
import RatingForm from "../questions/rating-form";
import MouseStartPage from "../pages/mouse-start-page";
import MouseTask from "../pages/mouse-task";
import MouseInfoPage from "../pages/mouse-info-page";
import MouseRatingForm from "../questions/mouse-rating-form";
import UploadPage from "../pages/upload-page";
import PreMoviePage from "../pages/pre-movie-page";
import CommentPage from "../pages/comment-page";
import MouseCommentPage from "../pages/mouse-comment-page";
import { log } from "../../actions/survey-actions";
import EachMovieRatingForm from "../questions/each-movie-rating-form";
import MovieSurveyForm from "../questions/movie-survey-form";

const INTRO_PAGE = "INTRO_PAGE";
const QUESTION_PAGE = "QUESTION_PAGE";
const MOVIE_PAGE = "MOVIE_PAGE";
const AGE_FORM = "AGE_FORM";
const GENDER_FORM = "GENDER_FORM";
const RATING_FORM = "RATING_FORM";
const MOUSE_START_PAGE = "MOUSE_START_PAGE";
const MOUSE_TASK = "MOUSE_TASK";
const MOUSE_INFO_PAGE = "MOUSE_INFO_PAGE";
const MOUSE_RATING_FORM = "MOUSE_RATING_FORM";
const UPLOAD_PAGE = "UPLOAD_PAGE";
const PRE_MOVIE_PAGE = "PRE_MOVIE_PAGE";
const COMMENT_PAGE = "COMMENT_PAGE";
const MOUSE_COMMENT_PAGE = "MOUSE_COMMENT_PAGE";
const EACH_MOVIE_RATING_FORM = "EACH_MOVIE_RATING_FORM";
const MOVIE_SURVEY_FORM = "MOVIE_SURVEY_FORM";

class MainStepper extends React.Component {
  constructor(props) {
    super(props);
    this.contents = this.getContents();
    this.numPages = this.contents.length;
    this.steps = this.fillSteps();
  }

  fillSteps() {
    var steps = [];
    for (let i = 0; i < this.numPages; i++) {
      steps.push((i + 1).toString());
    }
    return steps;
  }

  getContents() {
    var contents = [];
    
    // contents.push(new Page(INTRO_PAGE));

    // Questions
    // contents = this.addQuestionPages(contents);
    // contents.push(new Page(PRE_MOVIE_PAGE));
    // contents.push(new Page(MOVIE_PAGE));
    // contents.push(new Page(EACH_MOVIE_RATING_FORM));
    // contents.push(new Page(MOVIE_SURVEY_FORM));
    // contents.push(new Page(COMMENT_PAGE));


    // contents.push(new Page(MOUSE_START_PAGE));
    // contents.push(new Page(MOUSE_TASK));
    contents.push(new Page(MOUSE_INFO_PAGE));
    contents.push(new Page(MOUSE_TASK));
    contents.push(new Page(MOUSE_RATING_FORM));
    contents.push(new Page(MOUSE_COMMENT_PAGE));

    contents.push(new Page(AGE_FORM));
    contents.push(new Page(GENDER_FORM));
    contents.push(new Page(UPLOAD_PAGE));

    return contents;
  }

  addQuestionPages(contents) {
    var questions = this.props.questions;
    for (let i = 0; i < questions.length; i++) {
      var content = [i + 1, questions[i]];
      contents.push(new Page(QUESTION_PAGE, content));
    }

    return contents;
  }

  getStepper() {
    return (
      <div>
        <Stepper
          activeStep={this.props.activeStep}
          connector={<QontoConnector />}
        >
          {this.steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    );
  }

  divStepWrapper(boxContent, hasStepper = true) {
    return (
      <div>
        {/* {hasStepper ? this.getStepper() : null} */}
        {boxContent}
      </div>
    );
  }

  getComponent() {
    var pageObject = this.contents[this.props.activeStep];
    var name = pageObject.name;
    if (name === INTRO_PAGE) {
      var introPage = StarterBox(
        <IntroPage nextButton={this.getNextButton()} />
      );
      return this.divStepWrapper(introPage);
    }
    if (name === QUESTION_PAGE) {
      var questions = this.props.questions;
      var content = pageObject.content;
      var questionNumber = content[0].toString();
      var questionText = content[1];
      var questionPage = StarterBox(
        <QuestionPage
          questionNumber={questionNumber}
          questionText={questionText}
          numQuestions={questions.length}
          handleNext={this.handleNext}
        />
      );
      return this.divStepWrapper(questionPage);
    }
    if (name === MOVIE_PAGE) {
      var moviePage = StarterBox(
        <MoviePage handleNext={this.handleNext}/>
      );
      return this.divStepWrapper(moviePage);
    }
    if (name === AGE_FORM) {
      var ageForm = StarterBox(<AgeForm handleNext={this.handleNext} />);
      return this.divStepWrapper(ageForm);
    }
    if (name === GENDER_FORM) {
      var genderForm = StarterBox(<GenderForm handleNext={this.handleNext} />);
      return this.divStepWrapper(genderForm);
    }
    if (name === RATING_FORM) {
      var ratingForm = StarterBox(<RatingForm handleNext={this.handleNext} />);
      return this.divStepWrapper(ratingForm);
    }
    if (name === EACH_MOVIE_RATING_FORM) {
      var eachMovieRatingForm = StarterBox(<EachMovieRatingForm handleNext={this.handleNext} />);
      return this.divStepWrapper(eachMovieRatingForm);
    }
    if (name === MOVIE_SURVEY_FORM) {
      var movieSurveyForm = StarterBox(<MovieSurveyForm handleNext={this.handleNext} />);
      return this.divStepWrapper(movieSurveyForm);
    }
    if (name === MOUSE_START_PAGE) {
      var mouseStartPage = StarterBox(
        <MouseStartPage nextButton={this.getNextButton()} />
      );
      return this.divStepWrapper(mouseStartPage);
    }
    if (name === MOUSE_TASK) {
      var mouseTask = StarterBox(<MouseTask handleNext={this.handleNext} />);
      return this.divStepWrapper(mouseTask);
    }
    if (name === MOUSE_INFO_PAGE) {
      var mouseInfoPage = StarterBox(
        <MouseInfoPage nextButton={this.getNextButton()} />
      );
      return this.divStepWrapper(mouseInfoPage);
    }
    if (name === MOUSE_RATING_FORM) {
      var mouseRatingForm = StarterBox(
        <MouseRatingForm handleNext={this.handleNext} />
      );
      return this.divStepWrapper(mouseRatingForm);
    } 
    if (name === UPLOAD_PAGE) {
      var uploadPage = StarterBox(
        <UploadPage
          handleNext={this.handleNext}
          nextButton={this.getNextButton()}
        />
      );
      return this.divStepWrapper(uploadPage);
    }
    if (name === PRE_MOVIE_PAGE) {
      var preMoviePage = StarterBox(
        <PreMoviePage nextButton={this.getNextButton()} />
      );
      return this.divStepWrapper(preMoviePage);
    } if (name === COMMENT_PAGE) {
      var commentPage = StarterBox(
        <CommentPage handleNext={this.handleNext} />
      );
      return this.divStepWrapper(commentPage);
    } if (name === MOUSE_COMMENT_PAGE) {
      var mouseCommentPage = StarterBox(
        <MouseCommentPage handleNext={this.handleNext} />
      );
      return this.divStepWrapper(mouseCommentPage);
    }

    return null;
  }

  getNextButton() {
    return (
      <Button variant="contained" color="primary" onClick={this.handleNext}>
        {this.isLastStep() ? "Finish" : "Next"}
      </Button>
    );
  }

  isLastStep() {
    return (
      this.props.activeStep !== 0 &&
      this.props.activeStep === this.steps.length - 1
    );
  }

  handleNext = () => {

    var date = new Date();
    var currentPage = this.contents === null ? null : this.contents[this.props.activeStep].name;
    var logJson = {
      universalTime: date.getTime(),
      timestamp: date.toISOString(),
      action: "MAIN_STEPPER_HANDLE_NEXT",
      activeStep: this.props.activeStep,
      currentPage: currentPage
    };
    
    this.props.log(logJson);

    this.props.setActiveStep(this.props.activeStep + 1);
    
  };

  getExitPage() {
    return (
      <div>
        <Box mx="auto" width={900} marginTop={2}>
          <Paper elevation={3} height={"100%"} width={"100%"}>
            <Box p={3}>
              <Typography variant="h5">Thank you. Your completion code is {this.props.code}.</Typography>
            </Box>
          </Paper>
        </Box>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.activeStep === this.numPages
          ? this.getExitPage()
          : this.getComponent()}
      </div>
    );
  }
}

MainStepper.propTypes = {
  setActiveStep: PropTypes.func.isRequired,
  log: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    activeStep: state.init.activeStep,
    devUserId: state.init.devUserId,
    questions: state.init.questions,
    code: state.init.code
    };
};

export default connect(mapStateToProps, {
  setActiveStep,
  log
})(MainStepper);
