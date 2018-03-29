import {
  GET_COURSE_DATA_REQUEST_POST,
  GET_COURSE_DATA_RECEIVE_SUCCESS_POST,
  GET_COURSE_DATA_RECEIVE_ERROR_POST,
  CHANGE_COURSE_FIELDS,
  CREATE_COURSE_REQUEST_POST,
  CREATE_COURSE_RECEIVE_SUCCESS_POST,
  CREATE_COURSE_RECEIVE_ERROR_POST,
  CHANGE_COURSE_DETAIL,
  GET_COURSE_DETAIL_DATA_REQUEST_POST,
  GET_COURSE_DETAIL_DATA_RECEIVE_SUCCESS_POST,
  GET_COURSE_DETAIL_DATA_RECEIVE_ERROR_POST,
  MODIFY_COURSE_REQUEST_POST,
  MODIFY_COURSE_RECEIVE_SUCCESS_POST,
  MODIFY_COURSE_RECEIVE_ERROR_POST,
  DELETE_COURSE_REQUEST_POST,
  DELETE_COURSE_RECEIVE_SUCCESS_POST,
  DELETE_COURSE_RECEIVE_ERROR_POST
} from '../action/course';

const initialCourse = {
  courseData: [],
  isGettingCourseData: false,
  courseDetailData: {},
  isGettingCourseDetailData: false,
  courseFields: {
    courseName: {
      value: ''
    }
  },
  isCreatingCourse: false,
  courseDetail: '',
  isModifyingCourse: false,
  isDeletingCourse: false
}

export const course = (state = initialCourse, action) => {
  switch(action.type){
    case GET_COURSE_DATA_REQUEST_POST:
      return {...state, isGettingCourseData: true};
    case GET_COURSE_DATA_RECEIVE_SUCCESS_POST:
      return {...state, isGettingCourseData: false, courseData: action.courseData};
    case GET_COURSE_DATA_RECEIVE_ERROR_POST:
      return {...state, isGettingCourseData: false, courseData: action.courseData};
    case CHANGE_COURSE_FIELDS:
      return {...state, courseFields: {...state.courseFields, ...action.fieldsChanged}};
    case CREATE_COURSE_REQUEST_POST:
      return {...state, isCreatingCourse: true};
    case CREATE_COURSE_RECEIVE_SUCCESS_POST:
      return {...state, isCreatingCourse: false};
    case CREATE_COURSE_RECEIVE_ERROR_POST:
      return {...state, isCreatingCourse: false};
    case CHANGE_COURSE_DETAIL:
      return {...state, courseDetail: action.courseDetail};
    case GET_COURSE_DETAIL_DATA_REQUEST_POST:
      return {...state, isGettingCourseDetailData: true};
    case GET_COURSE_DETAIL_DATA_RECEIVE_SUCCESS_POST:
      return {...state, isGettingCourseDetailData: false, courseDetailData: action.courseDetailData, courseDetail: action.courseDetailData.detail, courseFields: {courseName: {value: action.courseDetailData.name}}};
    case GET_COURSE_DETAIL_DATA_RECEIVE_ERROR_POST:
      return {...state, isGettingCourseDetailData: false};
    case MODIFY_COURSE_REQUEST_POST:
      return {...state, isModifyingCourse: true};
    case MODIFY_COURSE_RECEIVE_SUCCESS_POST:
      return {...state, isModifyingCourse: false};
    case MODIFY_COURSE_RECEIVE_ERROR_POST:
      return {...state, isModifyingCourse: false};
    case DELETE_COURSE_REQUEST_POST:
      return {...state, isDeletingCourse: true};
    case DELETE_COURSE_RECEIVE_SUCCESS_POST:
      return {...state, isDeletingCourse: false};
    case DELETE_COURSE_RECEIVE_ERROR_POST:
      return {...state, isDeletingCourse: false};
    default:
      return state;
  }
}

export default course;