export const CHANGE_PRACTICE_FIELDS = 'CHANGE_PRACTICE_FIELDS';

export const CREATE_PRACTICE_REQUEST_POST = 'CREATE_PRACTICE_REQUEST_POST';

export const CREATE_PRACTICE_RECEIVE_SUCCESS_POST = 'CREATE_PRACTICE_RECEIVE_SUCCESS_POST';

export const CREATE_PRACTICE_RECEIVE_ERROR_POST = 'CREATE_PRACTICE_RECEIVE_ERROR_POST';

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

export const doCreatePractice = (practiceName, practicePrice, practiceImgUrl, successCallback, notLoggedCallback) => (dispatch) => {
  dispatch(doCreatePracticeRequestPost());
  return fetch('/server/practice/createPractice', {
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: 'practiceName=' + encodeURIComponent(practiceName) + '&practicePrice=' + encodeURIComponent(practicePrice) + '&practiceImgUrl=' + encodeURIComponent(practiceImgUrl),
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