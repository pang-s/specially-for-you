import { ADD_S3_EVENT, UPLOAD_PAGE_ON_MOUNT } from "../actions/types";
import { PURGE } from "redux-persist";

const initialState = {
  onMount: [],
  s3Events: [],
};

var uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case PURGE:
      // just in case purge() doesn't work
      return initialState;
    case ADD_S3_EVENT:
      return {
        ...state,
        s3Events: [...state.s3Events, action.payload],
      };
    case UPLOAD_PAGE_ON_MOUNT:
      return {
        ...state,
        onMount: [...state.onMount, action.payload],
      };

    default:
      return state;
  }
};

export default uploadReducer;
