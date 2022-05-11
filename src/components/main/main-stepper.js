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

export const INTRO_PAGE = "INTRO_PAGE";
export const QUESTION_PAGE = "QUESTION_PAGE";

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
    // var question1 = [1, "You like books and movies that make you come up with your own interpretation of the ending."]
    // contents.push(new Page(QUESTION_PAGE, question1));
    contents = this.addQuestionPages(contents);

    return contents;
  }

  addQuestionPages(contents) {
    var questions = [
      "You like books and movies that make you come up with your own interpretation of the ending.",
      "You feel more drawn to places with busy, bustling atmospheres than quiet, intimate places.",
      "You usually stay calm, even under a lot of pressure.",
      "Seeing other people cry can easily make you feel like you want to cry too.",
      "You enjoy watching people argue.",
      "You become bored or lose interest when the discussion gets highly theoretical.",
      "You are very intrigued by things labeled as controversial.",
      "You are definitely not an artistic type of person."
    ];

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
        {hasStepper ? this.getStepper() : null}
        {boxContent}
      </div>
    );
  }

  getComponent() {
    var pageObject = this.contents[this.props.activeContent];
    var content = pageObject.content;
    var name = pageObject.name.toString();
    if (name === INTRO_PAGE) {
      var introPage = StarterBox(
        <IntroPage nextButton={this.getNextButton()} />
      );
      return this.divStepWrapper(introPage);
    }
    if (name === QUESTION_PAGE) {
      var questionNumber = content[0];
      var questionText = content[1];
      var questionPage = StarterBox(
        <QuestionPage
          questionNumber={questionNumber}
          questionText={questionText}
          handleNext={this.handleNext}
        />
      );
      return this.divStepWrapper(questionPage);
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
