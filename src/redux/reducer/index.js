import { combineReducers } from "redux";
import manager from './manager.js';
import course from './course.js';
import homepage from './homepage.js';
import practice from './practice.js';

export const reducer = combineReducers({
  manager,
  course,
  homepage,
  practice
});

export default reducer;