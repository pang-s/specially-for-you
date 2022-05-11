import {
  SET_ACTIVE_STEP,
  SET_ACTIVE_CONTENT,
  SET_DEV_USER_ID
} from "../actions/types";
import { PURGE } from "redux-persist";

const initialState = {
  devUserId: null,
  activeStep: 0,
  activeContent: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PURGE:
      return initialState;
    case SET_DEV_USER_ID:
      return {
        ...state,
        devUserId: action.payload,
      };
    case SET_ACTIVE_STEP:
      return {
        ...state,
        activeStep: action.payload,
      };
    case SET_ACTIVE_CONTENT:
      return {
        ...state,
        activeContent: action.payload,
      };
    default:
      return state;
  }
};
