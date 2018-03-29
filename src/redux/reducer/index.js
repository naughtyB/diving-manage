import { combineReducers } from "redux";
import manager from './manager.js';
import course from './course.js';
import homepage from './homepage.js';

export const reducer = combineReducers({
  manager,
  course,
  homepage
});

export default reducer;