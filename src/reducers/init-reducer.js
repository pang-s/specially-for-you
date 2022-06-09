import {
  SET_ACTIVE_STEP,
  SET_DEV_USER_ID,
  SET_PARTICIPANT_NUM,
  SET_QUESTIONS,
  SET_IS_PERSONALISED,
  SET_WORKER_ID,
  SET_ASSIGNMENT_ID,
  SET_HIT_ID,
  SET_IS_GOOD
} from "../actions/types";
import { PURGE } from "redux-persist";
import { getRandomInt } from "../components/util.js";

const randomCode = getRandomInt(10000, 99999);

const initialState = {
  devUserId: null,
  isPersonalised: true,
  isGood: true,
  activeStep: 0,
  participantNum: 0,
  questions: [],
  code: randomCode,

  workerId: "",
  assignmentId: "",
  hitId: "",
};

var initReducer = (state = initialState, action) => {
  switch (action.type) {
    case PURGE:
      return initialState;
    case SET_DEV_USER_ID:
      return {
        ...state,
        devUserId: action.payload,
      };
    case SET_IS_PERSONALISED:
      return {
        ...state,
        isPersonalised: action.payload,
      };
    case SET_IS_GOOD:
      return {
        ...state,
        isGood: action.payload,
      };
    case SET_ACTIVE_STEP:
      return {
        ...state,
        activeStep: action.payload,
      };
    case SET_PARTICIPANT_NUM:
      return {
        ...state,
        participantNum: action.payload,
      };
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
    case SET_WORKER_ID:
      return {
        ...state,
        workerId: action.payload,
      };
    case SET_ASSIGNMENT_ID:
      return {
        ...state,
        assignmentId: action.payload,
      };

    case SET_HIT_ID:
      return {
        ...state,
        hitId: action.payload,
      };
    default:
      return state;
  }
};

export default initReducer;
