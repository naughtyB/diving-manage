export const CHANGE_MANAGER_LOGIN_STATE = 'CHANGE_MANAGER_LOGIN_STATE';

export const doChangeManagerLoginState = (loginState) => {
  return {
    type: CHANGE_MANAGER_LOGIN_STATE,
    loginState
  }
}