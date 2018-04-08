import {
  GET_PRACTICE_DATA_REQUEST_POST,
  GET_PRACTICE_DATA_RECEIVE_SUCCESS_POST,
  GET_PRACTICE_DATA_RECEIVE_ERROR_POST,
  CHANGE_PRACTICE_FIELDS,
  CREATE_PRACTICE_REQUEST_POST,
  CREATE_PRACTICE_RECEIVE_SUCCESS_POST,
  CREATE_PRACTICE_RECEIVE_ERROR_POST
} from '../action/practice';

const initialPractice = {
  practiceData: [],
  isGettingPracticeData: false,
  practiceFields: {
    practiceName: {
      value: ''
    },
    practicePrice: {
      value: ''
    },
    practiceImgUrl: {
      value: []
    },
    keys: {
      value: [0]
    },
    practiceIntroduction0: {
      value: {
        title: '',
        detail: ''
      }
    }
  },
  isCreatingPractice: false
}

export const practice = (state = initialPractice, action) => {
  switch(action.type){
    case GET_PRACTICE_DATA_REQUEST_POST:
      return {...state, isGettingPracticeData: true};
    case GET_PRACTICE_DATA_RECEIVE_SUCCESS_POST:
      return {...state, isGettingPracticeData: false, practiceData: action.practiceData};
    case GET_PRACTICE_DATA_RECEIVE_ERROR_POST:
      return {...state, isGettingPracticeData: false};
    case CHANGE_PRACTICE_FIELDS:
      return {...state, practiceFields: {...state.practiceFields, ...action.fieldsChanged}};
    case CREATE_PRACTICE_REQUEST_POST:
      return {...state, isCreatingPractice: true};
    case CREATE_PRACTICE_RECEIVE_SUCCESS_POST:
      return {...state, isCreatingPractice: false};
    case CREATE_PRACTICE_RECEIVE_ERROR_POST:
      return {...state, isCreatingPractice: false};
    default:
      return state;
  }
}

export default practice;