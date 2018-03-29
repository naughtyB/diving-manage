import fetch from 'isomorphic-fetch';
import Promise from 'promise-polyfill';
import Cookies from 'js-cookie'; 
//兼容性处理
if(!window.Promise){
    window.Promise=Promise
}

export const CHANGE_MANAGER_LOGIN_STATE = 'CHANGE_MANAGER_LOGIN_STATE';

export const CHANGE_MANAGER_LOGIN_FIELDS = 'CHANGE_MANAGER_LOGIN_FIELDS';

export const SUBMIT_LOGIN_REQUEST_POST = 'SUBMIT_LOGIN_REQUEST_POST';

export const SUBMIT_LOGIN_RECEIVE_SUCCESS_POST = 'SUBMIT_LOGIN_RECEIVE_SUCCESS_POST';

export const SUBMIT_LOGIN_RECEIVE_ERROR_POST = 'SUBMIT_LOGIN_RECEIVE_ERROR_POST';

export const CHANGE_MANAGER_REGISTER_FIELDS = 'CHANGE_MANAGER_REGISTER_FIELDS';

export const SUBMIT_REGISTER_REQUEST_POST = 'SUBMIT_REGISTER_REQUEST_POST';

export const SUBMIT_REGISTER_RECEIVE_SUCCESS_POST = 'SUBMIT_REGISTER_RECEIVE_SUCCESS_POST';

export const SUBMIT_REGISTER_RECEIVE_ERROR_POST = 'SUBMIT_REGISTER_RECEIVE_ERROR_POST';

export const CHANGE_MANAGER_RESET_PASSWORD_FIELDS = 'CHANGE_MANAGER_RESET_PASSWORD_FIELDS';

export const SUBMIT_RESET_PASSWORD_REQUEST_POST = 'SUBMIT_RESET_PASSWORD_REQUEST_POST';

export const SUBMIT_RESET_PASSWORD_RECEIVE_SUCCESS_POST = 'SUBMIT_RESET_PASSWORD_RECEIVE_SUCCESS_POST';

export const SUBMIT_RESET_PASSWORD_RECEIVE_ERROR_POST = 'SUBMIT_RESET_PASSWORD_RECEIVE_ERROR_POST';

export const CHANGE_MANAGER_LOGIN_TYPE = 'CHANGE_MANAGER_LOGIN_TYPE';

export const doChangeManagerLoginState = (loginState, managerData) => {
  return {
    type: CHANGE_MANAGER_LOGIN_STATE,
    loginState,
    managerData
  }
}

export const doChangeManagerLoginFields = (fieldsChanged) => {
  return {
    type: CHANGE_MANAGER_LOGIN_FIELDS,
    fieldsChanged
  }
}

export const doSubmitLoginRequestPost = () => {
  return {
    type: SUBMIT_LOGIN_REQUEST_POST
  }
}

export const doSubmitLoginReceiveSuccessPost = (managerData) => {
  return {
    type: SUBMIT_LOGIN_RECEIVE_SUCCESS_POST,
    managerData
  }
}

export const doSubmitLoginReceiveErrorPost = (errorType, error) => {
  return {
    type: SUBMIT_LOGIN_RECEIVE_ERROR_POST,
    errorType,
    error
  }
}

export const doSubmitLogin = (mobileNumber, password, successCallback) => (dispatch) => {
  dispatch(doSubmitLoginRequestPost());
  return fetch('/server/manager/login', {
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: 'mobileNumber=' + encodeURIComponent(mobileNumber) + '&password=' + encodeURIComponent(password)
  }).then(res => {
    return res.json();
  }).then(res => {
    if(!res.isCorrect){
      dispatch(doSubmitLoginReceiveErrorPost(res.errorType, res.error))
    }
    else{
      dispatch(doSubmitLoginReceiveSuccessPost(res.managerData));
      successCallback && successCallback();
      Cookies.set('mobileNumber', res.managerData['mobileNumber']);
      Cookies.set('managerId',res.managerData['_id']);
    }
  })
}

export const doChangeManagerRegisterFields = (fieldsChanged) => {
  return {
    type: CHANGE_MANAGER_REGISTER_FIELDS,
    fieldsChanged
  }
}

export const doSubmitRegisterRequestPost = () => {
  return {
    type: SUBMIT_REGISTER_REQUEST_POST
  }
}

export const doSubmitRegisterReceiveSuccessPost = (managerData) => {
  return {
    type: SUBMIT_REGISTER_RECEIVE_SUCCESS_POST,
    managerData
  }
}

export const doSubmitRegisterReceiveErrorPost = (errorType, error) => {
  return {
    type: SUBMIT_REGISTER_RECEIVE_ERROR_POST,
    errorType,
    error
  }
}

export const doSubmitRegister = (mobileNumber, password, username, captcha, successCallback) => (dispatch) => {
  dispatch(doSubmitRegisterRequestPost());
  return fetch('/server/manager/register', {
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    credentials: 'include',
    body: 'mobileNumber=' + encodeURIComponent(mobileNumber) + '&password=' + encodeURIComponent(password) + '&username=' + encodeURIComponent(username) + '&captcha=' + encodeURIComponent(captcha)
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res.isSuccessful){
      dispatch(doSubmitRegisterReceiveSuccessPost(res.managerData));
      successCallback && successCallback();
      Cookies.set('mobileNumber', res.managerData['mobileNumber']);
      Cookies.set('managerId',res.managerData['_id']);
    }
    else{
      dispatch(doSubmitRegisterReceiveErrorPost(res.errorType, res.error))
    }
  })
}

export const doChangeManagerResetPasswordFields = (fieldsChanged) => {
  return {
    type: CHANGE_MANAGER_RESET_PASSWORD_FIELDS,
    fieldsChanged
  }
}

export const doSubmitResetPasswordRequestPost = () => {
  return {
    type: SUBMIT_RESET_PASSWORD_REQUEST_POST
  }
}

export const doSubmitResetPasswordReceiveSuccessPost = (managerData) => {
  return {
    type: SUBMIT_RESET_PASSWORD_RECEIVE_SUCCESS_POST,
    managerData
  }
}

export const doSubmitResetPasswordReceiveErrorPost = (errorType, error) => {
  return {
    type: SUBMIT_RESET_PASSWORD_RECEIVE_ERROR_POST,
    errorType,
    error
  }
}

export const doSubmitResetPassword = (mobileNumber, password, captcha, successCallback) => (dispatch) =>{
  dispatch(doSubmitResetPasswordRequestPost());
  return fetch('/server/manager/resetPassword',{
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'mobileNumber=' + encodeURIComponent(mobileNumber) + '&password=' + encodeURIComponent(password) + '&captcha=' + encodeURIComponent(captcha)
  }).then(res => {
    return res.json();
  }).then(res => {
    if(res.isSuccessful){
      dispatch(doSubmitResetPasswordReceiveSuccessPost());
      successCallback && successCallback();
      Cookies.set('mobileNumber', res.managerData['mobileNumber']);
      Cookies.set('managerId',res.managerData['_id']);
    }
    else{
      dispatch(doSubmitResetPasswordReceiveErrorPost(res.errorType, res.error));
    }
  })
}

export const doChangeManagerLoginType = (loginType) => {
  return {
    type: CHANGE_MANAGER_LOGIN_TYPE,
    loginType
  }
}