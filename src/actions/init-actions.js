import {
  SET_ACTIVE_STEP, SET_ACTIVE_CONTENT, SET_DEV_USER_ID
} from "./types";

export const setActiveStep = (data) => {
  return {
    type: SET_ACTIVE_STEP,
    payload: data,
  };
};

export const setActiveContent = (data) => {
  return {
    type: SET_ACTIVE_CONTENT,
    payload: data,
  };
};

export const setDevUserId = (code) => {
  return {
    type: SET_DEV_USER_ID,
    payload: code,
  };
};