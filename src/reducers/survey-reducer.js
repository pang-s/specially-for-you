import { LOG_SURVEY_RESPONSE, LOG_GENERAL_SURVEY_PAGE } from "../actions/types";
import { PURGE } from "redux-persist";

const initialState = {
  responses: [],
  logs: []
};

var surveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case PURGE:
      return initialState;
    case LOG_SURVEY_RESPONSE:
      return {
        ...state,
        responses: [...state.responses, action.payload],
      };
    case LOG_GENERAL_SURVEY_PAGE:
      return {
        ...state,
        logs: [...state.logs, action.payload],
      };
    default:
      return state;
  }
};

export default surveyReducer;