import fetch from 'isomorphic-fetch';
import Promise from 'promise-polyfill';
//兼容性处理
if(!window.Promise){
    window.Promise=Promise
}

export const GET_PRACTICE_DATA_REQUEST_POST = 'GET_PRACTICE_DATA_REQUEST_POST';

export const GET_PRACTICE_DATA_RECEIVE_SUCCESS_POST = 'GET_PRACTICE_DATA_RECEIVE_SUCCESS_POST';

export const GET_PRACTICE_DATA_RECEIVE_ERROR_POST = 'GET_PRACTICE_DATA_RECEIVE_ERROR_POST';

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