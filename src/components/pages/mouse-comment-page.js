import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmptyOrWhitespace } from "../util";
import { logSurveyResponse, log } from "../../actions/survey-actions";

class CommentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNextButton: false,
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let date = new Date();
    let configJson = {
      universalTime: date.getTime(),
      timestamp: date.toISOString(),
      action: "MOUSE_COMMENT_PAGE_LOG_ON_MOUNT",
    };

    this.props.log(configJson);
  }

  handleTextFieldChange = (event) => {
    var targetValue = event.target.value;
    if (!isEmptyOrWhitespace(targetValue)) {
      this.setState({
        showNextButton: true,
        targetValue: targetValue,
      });
    } else {
      this.setState({
        showNextButton: false,
        targetValue: targetValue,
      });
    }
  };

  handleNext = (e) => {
    var date = new Date();
    var formJson = {
      universalTime: date.getTime(),
      timestamp: date.toISOString(),
      action: "MOUSE_COMMENT_PAGE_RESPONSE",
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

  render() {
    return (
      <div>
        <Box display="flex" height={"100%"} width={"100%"}>
          <Box width={"100%"}>
            <Box p={2}>
              <Typography variant="h5">
                Please type any comments you have on the pointer acceleration
                or rating you gave.
                <br></br>
                <br></br>
              </Typography>

              <TextField
                id="outlined-full-width"
                style={{ margin: 8 }}
                placeholder="Write your comment here"
                fullWidth
                margin="normal"
                multiline={true}
                rows={10}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleTextFieldChange}
                variant="outlined"
                inputProps={{ maxLength: 1000 }}
              />
            </Box>
            <Box p={2}>
              {this.state.showNextButton ? (
                <div>{this.getNextButton()}</div>
              ) : null}
            </Box>
          </Box>
        </Box>
      </div>
    );
  }
}

CommentPage.propTypes = {
  logSurveyResponse: PropTypes.func.isRequired,
  log: PropTypes.func.isRequired,
};

export default connect(null, {
  logSurveyResponse,
  log,
})(CommentPage);
