import fetch from 'isomorphic-fetch';
import Promise from 'promise-polyfill';
//兼容性处理
if(!window.Promise){
    window.Promise=Promise
}

export const GET_PRACTICE_DATA_REQUEST_POST = 'GET_PRACTICE_DATA_REQUEST_POST';

export const GET_PRACTICE_DATA_RECEIVE_SUCCESS_POST = 'GET_PRACTICE_DATA_RECEIVE_SUCCESS_POST';

export const GET_PRACTICE_DATA_RECEIVE_ERROR_POST = 'GET_PRACTICE_DATA_RECEIVE_ERROR_POST';

export const CHANGE_PRACTICE_FIELDS = 'CHANGE_PRACTICE_FIELDS';

export const CREATE_PRACTICE_REQUEST_POST = 'CREATE_PRACTICE_REQUEST_POST';

export const CREATE_PRACTICE_RECEIVE_SUCCESS_POST = 'CREATE_PRACTICE_RECEIVE_SUCCESS_POST';

export const CREATE_PRACTICE_RECEIVE_ERROR_POST = 'CREATE_PRACTICE_RECEIVE_ERROR_POST';

export const doGetPracticeDataRequestPost = () => {
  return {
    type: GET_PRACTICE_DATA_REQUEST_POST
  }
}

export const doGetPracticeDataReceiveSuccessPost = (practiceData) => {
  return {
    type: GET_PRACTICE_DATA_RECEIVE_SUCCESS_POST,
    practiceData
  }
}

export const doGetPracticeDataReceiveErrorPost = () => {
  return {
    type: GET_PRACTICE_DATA_RECEIVE_ERROR_POST
  }
}

export const doGetPracticeData = (errCallback) => (dispatch) => {
  dispatch(doGetPracticeDataRequestPost());
  return fetch('/server/practice/data', {
    method: 'get',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }).then(res => {
    return res.json();
  }).then(res => {
    if(res.error){
      dispatch(doGetPracticeDataReceiveErrorPost())
      errCallback && errCallback();
    }
    else{
      dispatch(doGetPracticeDataReceiveSuccessPost(res.practiceData))
    }
  })
}

export const doChangePracticeFields = (fieldsChanged) => {
  return {
    type: CHANGE_PRACTICE_FIELDS,
    fieldsChanged
  }
}

export const doCreatePracticeRequestPost = () => {
  return {
    type: CREATE_PRACTICE_REQUEST_POST
  }
}

export const doCreatePracticeReceiveSuccessPost = () => {
  return {
    type: CREATE_PRACTICE_RECEIVE_SUCCESS_POST
  }
}

export const doCreatePracticeReceiveErrorPost = () => {
  return {
    type: CREATE_PRACTICE_RECEIVE_ERROR_POST
  }
}

export const doCreatePractice = (practiceData, successCallback, notLoggedCallback) => (dispatch) => {
  dispatch(doCreatePracticeRequestPost());
  return fetch('/server/practice/createPractice', {
    method: 'post',
    headers:{
      'Content-Type':'application/json'
    },
    body: practiceData,
    credentials: 'include'
  }).then(res => {
    return res.json();
  }).then(res => {
    if(res.isSuccessful){
      dispatch(doCreatePracticeReceiveSuccessPost())
      successCallback && successCallback();
    }
    else{
      dispatch(doCreatePracticeReceiveErrorPost())
      if(res.loginState === false){
        notLoggedCallback && notLoggedCallback()
      }
    }
  })
}