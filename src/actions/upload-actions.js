
import { ADD_S3_EVENT, UPLOAD_PAGE_ON_MOUNT } from "../actions/types";

export const addS3Event = (logData) => {
  return {
    type: ADD_S3_EVENT,
    payload: logData,
  };
};

export const logOnMount = (logData) => {
  return {
    type: UPLOAD_PAGE_ON_MOUNT,
    payload: logData,
  };
};
