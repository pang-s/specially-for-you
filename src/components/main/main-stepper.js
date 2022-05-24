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
import { setActiveStep, setActiveContent } from "../../actions/init-actions.js";
import QuestionPage from "../pages/question-page";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import MoviePage from "../pages/movie-page";
import AgeForm from "../pages/age-form";
import GenderForm from "../pages/gender-form";
import RatingForm from "../pages/rating-form";
import MouseStartPage from "../pages/mouse-start-page";
import MouseTask from "../pages/mouse-task";
import MouseInfoPage from "../pages/mouse-info-page";
import MouseRatingForm from "../pages/mouse-rating-form";

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

// const questions = ["You like books and movies that make you come up with your own interpretation of the ending."];
const questions = [
  "You like books and movies that make you come up with your own interpretation of the ending.",
  "You feel more drawn to places with busy, bustling atmospheres than quiet, intimate places.",
  "You usually stay calm, even under a lot of pressure.",
  "Seeing other people cry can easily make you feel like you want to cry too.",
  "You enjoy watching people argue.",
  "You become bored or lose interest when the discussion gets highly theoretical.",
  "You are very intrigued by things labeled as controversial.",
  "You are definitely not an artistic type of person.",
];

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
    contents.push(new Page(INTRO_PAGE));

    // Questions
    contents = this.addQuestionPages(contents);
    contents.push(new Page(MOVIE_PAGE));
    contents.push(new Page(RATING_FORM));

    contents.push(new Page(MOUSE_START_PAGE));
    contents.push(new Page(MOUSE_TASK));
    contents.push(new Page(MOUSE_INFO_PAGE));
    contents.push(new Page(MOUSE_TASK));
    contents.push(new Page(MOUSE_RATING_FORM));

    contents.push(new Page(AGE_FORM));
    contents.push(new Page(GENDER_FORM));
    return contents;
  }

  addQuestionPages(contents) {
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
    var pageObject = this.contents[this.props.activeContent];
    var name = pageObject.name;
    if (name === INTRO_PAGE) {
      var introPage = StarterBox(
        <IntroPage nextButton={this.getNextButton()} />
      );
      return this.divStepWrapper(introPage);
    }
    if (name === QUESTION_PAGE) {
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
        <MoviePage nextButton={this.getNextButton()} />
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
      this.props.activeContent !== 0 &&
      this.props.activeContent === this.steps.length - 1
    );
  }

  handleNext = (advancePage = true) => {
    this.props.setActiveContent(this.props.activeContent + 1);
    if (advancePage) {
      this.props.setActiveStep(this.props.activeStep + 1);
    }
  };

  getExitPage() {
    return (
      <div>
        <Box mx="auto" width={900}>
          <Paper elevation={3} height={"100%"} width={"100%"}>
            <Box p={3}>
              <Typography>Thank you.</Typography>
            </Box>
          </Paper>
        </Box>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.activeContent === this.numPages
          ? this.getExitPage()
          : this.getComponent()}
      </div>
    );
  }
}

MainStepper.propTypes = {
  setActiveStep: PropTypes.func.isRequired,
  setActiveContent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    activeStep: state.init.activeStep,
    activeContent: state.init.activeContent,
  };
};

export default connect(mapStateToProps, {
  setActiveStep,
  setActiveContent,
})(MainStepper);
