import * as React from "react";
import Box from "@mui/material/Box";
import ReCAPTCHA from "react-google-recaptcha";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { log } from "../../actions/survey-actions";

export class IntroPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      captchaValue: null
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let date = new Date();
    let configJson = {
      universalTime: date.getTime(),
      timestamp: date.toISOString(),
      action: "INTRO_PAGE_LOG_ON_MOUNT",
    };

    this.props.log(configJson);
  }

  onChange = value => {
    console.log("onChange prop - Captcha value:", value);

    this.setState({
      captchaValue: value,
    })
    
    let date = new Date();
    let log = {
      universalTime: date.getTime(),
      timestamp: date.toISOString(),
      action: "RECAPTCHA_UPDATE",
      state: this.state,
      captchaValue: value
    };

    this.props.log(log);
  };


  render() {
    return (
      <div>
        <Box p={2}>
          Welcome!
          <br></br>
          This experiment will be done in two parts.
          <br></br>
          <br></br>
          <b>Part 1: Movies</b>
          <br></br>
          <ol>
            <li>Complete a questionnaire</li>
            <li>View a set of movie recommendations</li>
            <li>Rate the movie recommendations.</li>
          </ol>
          <b>Part 2: Mouse pointing</b>
          <br></br>
          
          <br></br>
          <ol>
            <li>Complete a mouse-pointing task</li>
            <li>Repeat the mouse-pointing task</li>
            <li>Rate the pointer acceleration (how fast the cursor moves in response to mouse movement).</li>
          </ol>
          <br></br>
          <ReCAPTCHA
            sitekey="6LcfjWwgAAAAALcSTnD3M1ffnXkp80PK75NX6Q9z"
            onChange={this.onChange}
          />
  <br></br>
          Complete the reCAPTCHA and then click "NEXT" to begin Part 1.
        </Box>
        <Box p={2}>{this.state.captchaValue !== null ? this.props.nextButton : null}</Box>
      </div>
    );
  }
}



IntroPage.propTypes = {
  log: PropTypes.func.isRequired,
};

export default connect(null, {
  log,
})(IntroPage);

