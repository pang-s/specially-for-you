import { LOG_GENERAL_MOUSE_TASK } from "../actions/types";
import { PURGE } from "redux-persist";

const initialState = {
  logs: []
};

var mouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case PURGE:
      return initialState;
    case LOG_GENERAL_MOUSE_TASK:
      return {
        ...state,
        logs: [...state.logs, action.payload],
      };
    default:
      return state;
  }
};

export default mouseReducer;