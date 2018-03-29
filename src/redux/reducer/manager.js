import { 
  CHANGE_MANAGER_LOGIN_STATE,
  CHANGE_MANAGER_LOGIN_FIELDS,
  SUBMIT_LOGIN_REQUEST_POST,
  SUBMIT_LOGIN_RECEIVE_SUCCESS_POST,
  SUBMIT_LOGIN_RECEIVE_ERROR_POST,
  CHANGE_MANAGER_REGISTER_FIELDS,
  SUBMIT_REGISTER_REQUEST_POST,
  SUBMIT_REGISTER_RECEIVE_SUCCESS_POST,
  SUBMIT_REGISTER_RECEIVE_ERROR_POST,
  CHANGE_MANAGER_RESET_PASSWORD_FIELDS,
  SUBMIT_RESET_PASSWORD_REQUEST_POST,
  SUBMIT_RESET_PASSWORD_RECEIVE_SUCCESS_POST,
  SUBMIT_RESET_PASSWORD_RECEIVE_ERROR_POST,
  CHANGE_MANAGER_LOGIN_TYPE
} from '../action/manager'

const initialManager = {
  loginState: false,
  isLogging: false,
  isRegistering: false,
  isResettingPassword: false,
  loginFields: {
    mobileNumber: {
      value: ''
    },
    password: {
      value: ''
    }
  },
  registerFields: {
    mobileNumber: {
      value: ''
    },
    password: {
      value: ''
    },
    confirm: {
      value: ''
    },
    username: {
      value: ''
    },
    captcha: {
      value: ''
    }
  },
  resetPasswordFields: {
    mobileNumber:{
      value: ''
    },
    password: {
      value: ''
    },
    confirm: {
      value: ''
    },
    captcha: {
      value: ''
    }
  },
  loginType: 'login',
  managerData: {}
}

export const manager = (state = initialManager, action) => {
  switch(action.type){
    case CHANGE_MANAGER_LOGIN_STATE:
      return {...state, loginState: action.loginState, managerData: action.managerData};
    case CHANGE_MANAGER_LOGIN_FIELDS:
      return {...state, loginFields: {...state.loginFields, ...action.fieldsChanged}}
    case SUBMIT_LOGIN_REQUEST_POST:
      return {...state, isLogging: true};
    case SUBMIT_LOGIN_RECEIVE_SUCCESS_POST:
      return {...state, isLogging: false, loginState: true, managerData: action.managerData};
    case SUBMIT_LOGIN_RECEIVE_ERROR_POST:
      return {
        ...state, 
        isLogging: false,
        loginFields: {
          ...state.loginFields,
          [action.errorType]: {
            ...state.loginFields[action.errorType],
            errors: [{field: action.errorType, message: action.error}]
          }
        }  
      };
    case CHANGE_MANAGER_REGISTER_FIELDS:
      return {...state, registerFields: {...state.registerFields, ...action.fieldsChanged}};
    case SUBMIT_REGISTER_REQUEST_POST:
      return {...state, isRegistering: true};
    case SUBMIT_REGISTER_RECEIVE_SUCCESS_POST:
      return {...state, isRegistering: false, loginState: true, managerData: action.managerData};
    case SUBMIT_REGISTER_RECEIVE_ERROR_POST:
      return {
        ...state, 
        isRegistering: false,
        registerFields: {
          ...state.registerFields,
          [action.errorType]: {
            ...state.registerFields[action.errorType],
            errors: [{field: action.errorType, message: action.error}]
          }
        }  
    }
    case CHANGE_MANAGER_RESET_PASSWORD_FIELDS:
      return {...state, resetPasswordFields: {...state.resetPasswordFields, ...action.fieldsChanged}};
    case SUBMIT_REGISTER_REQUEST_POST:
      return {...state, isResettingPassword: true};
    case SUBMIT_RESET_PASSWORD_RECEIVE_SUCCESS_POST:
      return {...state, isResettingPassword: false, loginState: true, managerData: action.managerData};
    case SUBMIT_RESET_PASSWORD_RECEIVE_ERROR_POST:
      return {
        ...state,
        isResettingPassword: false,
        resetPasswordFields: {
          ...state.resetPasswordFields,
          [action.errorType]: {
            ...state.resetPasswordFields[action.errorType],
            errors: [{field: action.errorType, message: action.error}]
          }
        }
      }
    case CHANGE_MANAGER_LOGIN_TYPE:
      return {...state, loginType: action.loginType};
    default:
      return state;
  }
}

export default manager;