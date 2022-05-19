import {
    LOG_SURVEY_RESPONSE,
    LOG_GENERAL_SURVEY_PAGE
  } from "./types";
  
  export const logSurveyResponse = (data) => {
    return {
      type: LOG_SURVEY_RESPONSE,
      payload: data,
    };
  };

  export const log = (data) => {
    return {
      type: LOG_GENERAL_SURVEY_PAGE,
      payload: data,
    };
  };