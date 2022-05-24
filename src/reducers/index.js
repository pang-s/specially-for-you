import { combineReducers } from "redux";
import initReducer from "./init-reducer";
import questionsReducer from "./questions-reducer";
import surveyReducer from "./survey-reducer";
import mouseReducer from "./mouse-reducer";

const rootReducer = combineReducers({
  init: initReducer,
  questions: questionsReducer,
  survey: surveyReducer,
  mouse: mouseReducer
});

export default rootReducer;