import { LOG_QUESTION_RESPONSE, LOG_GENERAL_QUESTION_PAGE } from "../actions/types";
import { PURGE } from "redux-persist";

const initialState = {
  responses: [],
  logs: []
};

var questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PURGE:
      return initialState;
    case LOG_QUESTION_RESPONSE:
      return {
        ...state,
        responses: [...state.responses, action.payload],
      };
    case LOG_GENERAL_QUESTION_PAGE:
      return {
        ...state,
        logs: [...state.logs, action.payload],
      };
    default:
      return state;
  }
};

export default questionsReducer;