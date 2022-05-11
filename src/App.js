import React from 'react';
import './App.css';
import MainStepper from './components/main/main-stepper';
import { setDevUserId } from './actions/init-actions';
import { getQueryVariable } from './components/util.js'
import PropTypes from "prop-types";
import { connect } from "react-redux"; 

class App extends React.Component {
  constructor(props) {
    super(props);

    this.purgeOnNewId = this.purgeOnNewId.bind(this);
  }

  componentDidMount() {
  const devUserIdString = getQueryVariable("devUserId");
  const devUserIdInt = parseInt(devUserIdString);
    if (devUserIdString !== false) {
      if (!isNaN(devUserIdString) && devUserIdInt >= 0) {
        this.purgeOnNewId(devUserIdInt);
        this.props.setDevUserId(devUserIdInt);

      }
    }
  }

  isNewDevUserId(devUserIdInt) {
    var isNewUser = (this.props.init.devUserId !== null && this.props.init.devUserId !== devUserIdInt);
    // console.log("isNewUser ", isNewUser);
    return isNewUser;
  }

  purgeOnNewId(devUserIdInt) {
    var isNewUser = this.isNewDevUserId(devUserIdInt);
    if (isNewUser) {
      // Reset/purge if new devUserId is given
      this.props.persistor.purge();
    }
  }

  render(){
    return (
      <div className="App">
        <MainStepper />
      </div>
    );
  }
}

App.propTypes = {
  setDevUserId: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    init: state.init,
  };
};

export default connect(mapStateToProps, {
  setDevUserId
})(App);
