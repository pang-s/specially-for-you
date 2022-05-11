import { combineReducers } from "redux";
import initReducer from "./init-reducer";
import questionsReducer from "./questions-reducer";
const rootReducer = combineReducers({
  init: initReducer,
  questions: questionsReducer
});

export default rootReducer;