import {
  GET_PRACTICE_DATA_REQUEST_POST,
  GET_PRACTICE_DATA_RECEIVE_SUCCESS_POST,
  GET_PRACTICE_DATA_RECEIVE_ERROR_POST
} from '../action/practice';

const initialPractice = {
  practiceData: [],
  isGettingPracticeData: false
}

export const practice = (state = initialPractice, action) => {
  switch(action.type){
    case GET_PRACTICE_DATA_REQUEST_POST:
      return {...state, isGettingPracticeData: true};
    case GET_PRACTICE_DATA_RECEIVE_SUCCESS_POST:
      return {...state, isGettingPracticeData: false, practiceData: action.practiceData};
    case GET_PRACTICE_DATA_RECEIVE_ERROR_POST:
      return {...state, isGettingPracticeData: false};
    default:
      return state;
  }
}

export default practice;