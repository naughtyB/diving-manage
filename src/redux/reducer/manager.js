import { CHANGE_MANAGER_LOGIN_STATE } from '../action/manager'

const initialManager = {
  loginState: false
}

export const manager = (state = initialManager, action) => {
  switch(action.type){
    case CHANGE_MANAGER_LOGIN_STATE:
      return {...state, loginState: action.loginState};
    default:
      return state;
  }
}

export default manager;