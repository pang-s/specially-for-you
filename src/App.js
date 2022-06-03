import React from "react";
import "./App.css";
import MainStepper from "./components/main/main-stepper";
import { setDevUserId, setParticipantNum, setQuestions, setIsPersonalised } from "./actions/init-actions";
import { getQueryVariable } from "./components/util.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getQuestions } from "./components/main/questions";
import { IdlePage } from "./components/main/idle-page";
import { isDevPersonalised } from "./components/util";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowingMain: false
    };
    this.purgeOnNewId = this.purgeOnNewId.bind(this);
  }

  componentDidMount() {
    const participant = getQueryVariable("p");
    const devUserIdString = getQueryVariable("devUserId");
    const devUserIdInt = parseInt(devUserIdString);
    if (devUserIdString !== false) {
      if (!isNaN(devUserIdString) && devUserIdInt >= 0) {
        this.purgeOnNewId(devUserIdInt);
        this.props.setDevUserId(devUserIdInt);

        var isPersonalised = isDevPersonalised(devUserIdInt); 
        this.props.setIsPersonalised(isPersonalised);
        var questions = getQuestions(isPersonalised);
        this.props.setQuestions(questions);
      }

      if (participant) {
        this.props.setParticipantNum(participant)
      }

      this.setState({
        isShowingMain: true,
      });
    }
  }

  isNewDevUserId(devUserIdInt) {
    var isNewUser =
      this.props.init.devUserId !== null &&
      this.props.init.devUserId !== devUserIdInt;
    return isNewUser;
  }

  purgeOnNewId(devUserIdInt) {
    var isNewUser = this.isNewDevUserId(devUserIdInt);
    console.log("new user ", devUserIdInt);
    if (isNewUser) {
      // Reset/purge if new devUserId is given
      this.props.persistor.purge();
    }
  }



  render() {
    return (
      <div className="App">
        {!this.state.isShowingMain ? (
          IdlePage()
        ) : (
          <MainStepper />
        )}
      </div>
    );
  }
}

App.propTypes = {
  setDevUserId: PropTypes.func.isRequired,
  setParticipantNum: PropTypes.func.isRequired,
  setQuestions: PropTypes.func.isRequired,
  setIsPersonalised: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    init: state.init,
  };
};

export default connect(mapStateToProps, {
  setDevUserId, setParticipantNum, setQuestions, setIsPersonalised
})(App);
