import fetch from 'isomorphic-fetch';
import Promise from 'promise-polyfill';
//兼容性处理
if(!window.Promise){
    window.Promise=Promise
}

export const GET_COURSE_DATA_REQUEST_POST = 'GET_COURSE_DATA_REQUEST_POST';

export const GET_COURSE_DATA_RECEIVE_SUCCESS_POST = 'GET_COURSE_DATA_RECEIVE_SUCCESS_POST';

export const GET_COURSE_DATA_RECEIVE_ERROR_POST = 'GET_COURSE_DATA_RECEIVE_ERROR_POST';

export const CHANGE_COURSE_FIELDS = 'CHANGE_COURSE_FIELDS';

export const CREATE_COURSE_REQUEST_POST = 'CREATE_COURSE_REQUEST_POST';

export const CREATE_COURSE_RECEIVE_SUCCESS_POST = 'CREATE_COURSE_RECEIVE_SUCCESS_POST';

export const CREATE_COURSE_RECEIVE_ERROR_POST = 'CREATE_COURSE_RECEIVE_ERROR_POST';

export const CHANGE_COURSE_DETAIL = 'CHANGE_COURSE_DETAIL';

export const GET_COURSE_DETAIL_DATA_REQUEST_POST = 'GET_COURSE_DETAIL_DATA_REQUEST_POST';

export const GET_COURSE_DETAIL_DATA_RECEIVE_SUCCESS_POST = 'GET_COURSE_DETAIL_DATA_RECEIVE_SUCCESS_POST';

export const GET_COURSE_DETAIL_DATA_RECEIVE_ERROR_POST = 'GET_COURSE_DETAIL_DATA_RECEIVE_ERROR_POST';

export const MODIFY_COURSE_REQUEST_POST = 'MODIFY_COURSE_REQUEST_POST';

export const MODIFY_COURSE_RECEIVE_SUCCESS_POST = 'MODIFY_COURSE_RECEIVE_SUCCESS_POST';

export const MODIFY_COURSE_RECEIVE_ERROR_POST = 'MODIFY_COURSE_RECEIVE_ERROR_POST';

export const DELETE_COURSE_REQUEST_POST = 'DELETE_COURSE_REQUEST_POST';

export const DELETE_COURSE_RECEIVE_SUCCESS_POST = 'DELETE_COURSE_RECEIVE_SUCCESS_POST';

export const DELETE_COURSE_RECEIVE_ERROR_POST = 'DELETE_COURSE_RECEIVE_ERROR_POST';

 
export const doGetCourseDataRequestPost = () => {
  return {
    type: GET_COURSE_DATA_REQUEST_POST
  }
}

export const doGetCourseDataReceiveSuccessPost = (courseData) => {
  return {
    type: GET_COURSE_DATA_RECEIVE_SUCCESS_POST,
    courseData
  }
}

export const doGetCourseDataReceiveErrorPost = (courseData) => {
  return {
    type: GET_COURSE_DATA_RECEIVE_ERROR_POST,
    courseData
  }
}

export const doGetCourseData = () => (dispatch) => {
  dispatch(doGetCourseDataRequestPost());
  return fetch('/server/course/getCourseData', {
    method: 'get',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }).then(res => {
    return res.json();
  }).then(res => {
    if(!res.isSuccessful){
      dispatch(doGetCourseDataReceiveErrorPost(undefined))
    }
    else{
      dispatch(doGetCourseDataReceiveSuccessPost(res.courseData));
    }
  })
}

export const doChangeCourseFields = (fieldsChanged) => {
  return {
    type: CHANGE_COURSE_FIELDS,
    fieldsChanged
  }
}

export const doCreateCourseRequestPost = () => {
  return {
    type: CREATE_COURSE_REQUEST_POST
  }
}

export const doCreateCourseReceiveSuccessPost = () => {
  return {
    type: CREATE_COURSE_RECEIVE_SUCCESS_POST
  }
}

export const doCreateCourseReceiveErrorPost = () => {
  return {
    type: CREATE_COURSE_RECEIVE_ERROR_POST
  }
}

export const doCreateCourse = (courseName, courseDetail, successCallback, notLoggedCallback) => (dispatch) => {
  dispatch(doCreateCourseRequestPost());
  return fetch('/server/course/createCourse', {
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: 'courseName=' + encodeURIComponent(courseName) + '&courseDetail=' + encodeURIComponent(courseDetail),
    credentials: 'include'
  }).then(res => {
    return res.json();
  }).then(res => {
    if(res.isSuccessful){
      dispatch(doCreateCourseReceiveSuccessPost())
      successCallback && successCallback();
    }
    else{
      dispatch(doCreateCourseReceiveErrorPost())
      if(res.loginState === false){
        notLoggedCallback && notLoggedCallback()
      }
    }
  })
}

export const doChangeCourseDetail = (courseDetail) => {
  return {
    type: CHANGE_COURSE_DETAIL,
    courseDetail
  }
}

export const doGetCourseDetailDataRequestPost = () => {
  return {
    type: GET_COURSE_DETAIL_DATA_REQUEST_POST
  }
}

export const doGetCourseDetailDataReceiveSuccessPost = (courseDetailData) => {
  return {
    type: GET_COURSE_DETAIL_DATA_RECEIVE_SUCCESS_POST,
    courseDetailData
  }
}

export const doGetCourseDetailDataReceiveErrorPost = () => {
  return {
    type: GET_COURSE_DETAIL_DATA_RECEIVE_ERROR_POST
  }
}

export const doGetCourseDetailData = (courseId, errCallback) => (dispatch) => {
  dispatch(doGetCourseDetailDataRequestPost());
  return fetch('/server/course/getCourseDetailData', {
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: 'courseId=' + encodeURIComponent(courseId)
  }).then(res => {
    return res.json();
  }).then(res => {
    if(!res.isSuccessful){
      dispatch(doGetCourseDetailDataReceiveErrorPost());
      errCallback && errCallback();
    }
    else{
      dispatch(doGetCourseDetailDataReceiveSuccessPost(res.courseData));
    }
  })
}

export const doModifyCourseRequestPost = () => {
  return {
    type: MODIFY_COURSE_REQUEST_POST
  }
}

export const doModifyCourseReceiveSuccessPost = () => {
  return {
    type: MODIFY_COURSE_RECEIVE_SUCCESS_POST
  }
}

export const doModifyCourseReceiveErrorPost = () => {
  return {
    type: MODIFY_COURSE_RECEIVE_ERROR_POST
  }
}

export const doModifyCourse = (courseId, courseName, courseDetail, successCallback, notLoggedCallback) => (dispatch) => {
  dispatch(doModifyCourseRequestPost());
  return fetch('/server/course/modifyCourse', {
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: 'courseId=' + encodeURIComponent(courseId) + '&courseName=' + encodeURIComponent(courseName) + '&courseDetail=' + encodeURIComponent(courseDetail),
    credentials: 'include'
  }).then(res => {
    return res.json();
  }).then(res => {
    if(res.isSuccessful){
      dispatch(doModifyCourseReceiveSuccessPost())
      successCallback && successCallback();
    }
    else{
      dispatch(doModifyCourseReceiveErrorPost())
      if(res.loginState === false){
        notLoggedCallback && notLoggedCallback()
      }
    }
  })
}

export const doDeleteCourseRequestPost = () => {
  return {
    type: DELETE_COURSE_REQUEST_POST
  }
}

export const doDeleteCourseReceiveSuccessPost = () => {
  return {
    type: DELETE_COURSE_RECEIVE_SUCCESS_POST
  }
}

export const doDeleteCourseReceiveErrorPost = () => {
  return {
    type: DELETE_COURSE_RECEIVE_ERROR_POST
  }
}

export const doDeleteCourse = (courseId, successCallback, notLoggedCallback) => (dispatch) => {
  dispatch(doDeleteCourseRequestPost());
  return fetch('/server/course/deleteCourse', {
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: 'courseId=' + courseId,
    credentials: 'include'
  }).then(res => {
    return res.json();
  }).then(res => {
    if(res.isSuccessful){
      dispatch(doDeleteCourseReceiveSuccessPost())
      successCallback && successCallback();
    }
    else{
      dispatch(doDeleteCourseReceiveErrorPost())
      if(res.loginState === false){
        notLoggedCallback && notLoggedCallback()
      }
    }
  })
}