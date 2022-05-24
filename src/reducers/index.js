import { combineReducers } from "redux";
import initReducer from "./init-reducer";
import questionsReducer from "./questions-reducer";
import surveyReducer from "./survey-reducer";
import mouseReducer from "./mouse-reducer";
import uploadReducer from "./upload-reducer";

const rootReducer = combineReducers({
  init: initReducer,
  questions: questionsReducer,
  survey: surveyReducer,
  mouse: mouseReducer,
  upload: uploadReducer
});

export default rootReducer;