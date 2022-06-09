import React from "react";
import "./App.css";
import MainStepper from "./components/main/main-stepper";
import {
  setDevUserId,
  setParticipantNum,
  setQuestions,
  setIsPersonalised,
  setAssignmentId,
  setWorkerId,
  setHitId,
  setIsGood
} from "./actions/init-actions";
import { getQueryVariable } from "./components/util.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getQuestions } from "./components/main/questions";
import { IdlePage } from "./components/main/idle-page";
import { isEven } from "./components/util";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowingMain: false,
    };
    this.purgeOnNewId = this.purgeOnNewId.bind(this);
  }

  componentDidMount() {
    const participant = getQueryVariable("p");
    const devUserIdString = getQueryVariable("devUserId");

    const assignmentId = getQueryVariable("assignmentId");
    const workerId = getQueryVariable("workerId");
    const hitId = getQueryVariable("hitId");


    const devUserIdInt = parseInt(devUserIdString);
    if (devUserIdString !== false) {
      if (!isNaN(devUserIdString) && devUserIdInt >= 0) {
        this.purgeOnNewId(devUserIdInt, participant);
        this.props.setDevUserId(devUserIdInt);

        var isPersonalised = isEven(devUserIdInt);
        this.props.setIsPersonalised(isPersonalised);

        var isGood = isEven(participant);
        this.props.setIsGood(isGood);

        var questions = getQuestions(isPersonalised);
        this.props.setQuestions(questions);
      }

      if (participant) {
        this.props.setParticipantNum(participant);
      }

      if (assignmentId) {
        this.props.setAssignmentId(assignmentId);
      }

      if (workerId) {
        this.props.setWorkerId(workerId);
      }

      if (hitId) {
        this.props.setHitId(hitId);
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

  isNewParticipant(participantNum) {
    var isNewParticipant =
      this.props.init.participantNum !== null &&
      this.props.init.participantNum !== participantNum;
    return isNewParticipant;
  }

  purgeOnNewId(devUserIdInt, participant) {
    var isNewUser = this.isNewDevUserId(devUserIdInt);
    var isNewParticipant = this.isNewParticipant(participant)

    console.log("new user ", devUserIdInt);
    if (isNewUser || isNewParticipant) {
      // Reset/purge if new devUserId is given
      this.props.persistor.purge();
    }
  }

  render() {
    return (
      <div className="App">
        {!this.state.isShowingMain ? IdlePage() : <MainStepper />}
      </div>
    );
  }
}

App.propTypes = {
  setDevUserId: PropTypes.func.isRequired,
  setParticipantNum: PropTypes.func.isRequired,
  setQuestions: PropTypes.func.isRequired,
  setIsPersonalised: PropTypes.func.isRequired,
  setAssignmentId: PropTypes.func.isRequired,
  setWorkerId: PropTypes.func.isRequired,
  setHitId: PropTypes.func.isRequired,
  setIsGood: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    init: state.init,
  };
};

export default connect(mapStateToProps, {
  setDevUserId,
  setParticipantNum,
  setQuestions,
  setIsPersonalised,
  setAssignmentId,
  setWorkerId,
  setHitId,
  setIsGood
})(App);
