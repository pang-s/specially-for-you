import {
    LOG_QUESTION_RESPONSE,
    LOG_GENERAL_QUESTION_PAGE
  } from "./types";
  
  export const logQuestionResponse = (data) => {
    return {
      type: LOG_QUESTION_RESPONSE,
      payload: data,
    };
  };

  export const log = (data) => {
    return {
      type: LOG_GENERAL_QUESTION_PAGE,
      payload: data,
    };
  };