import {
    LOG_GENERAL_MOUSE_TASK
  } from "./types";
  
  export const log = (data) => {
    return {
      type: LOG_GENERAL_MOUSE_TASK,
      payload: data,
    };
  };