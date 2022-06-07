import {
  SET_ACTIVE_STEP, SET_DEV_USER_ID, SET_PARTICIPANT_NUM, SET_QUESTIONS, SET_IS_PERSONALISED,
  SET_WORKER_ID, SET_ASSIGNMENT_ID, SET_HIT_ID
} from "./types";

export const setActiveStep = (data) => {
  return {
    type: SET_ACTIVE_STEP,
    payload: data,
  };
};

export const setDevUserId = (code) => {
  return {
    type: SET_DEV_USER_ID,
    payload: code,
  };
};

export const setParticipantNum = (num) => {
  return {
    type: SET_PARTICIPANT_NUM,
    payload: num,
  };
};

export const setQuestions = (data) => {
  return {
    type: SET_QUESTIONS,
    payload: data,
  };
};


export const setIsPersonalised = (data) => {
  return {
    type: SET_IS_PERSONALISED,
    payload: data,
  };
};


export const setWorkerId = (data) => {
  return {
    type: SET_WORKER_ID,
    payload: data,
  };
};

export const setAssignmentId = (data) => {
  return {
    type: SET_ASSIGNMENT_ID,
    payload: data,
  };
};

export const setHitId = (data) => {
  return {
    type: SET_HIT_ID,
    payload: data,
  };
};