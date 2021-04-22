import { Reducer } from 'redux';
import { AuthActions, AuthActionTypes, AuthState } from './types';
const initialState = {
  sending_login: false,
  sending_register: false,
  message: {
    login_success: false,
    register_success: false,
  },
};
const AuthReducer: Reducer<AuthState, AuthActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AuthActionTypes.SENDING_LOGIN:
      return { ...state, sending_login: true };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        sending_login: false,
        message: {
          login_success: true,
        },
      };
    case AuthActionTypes.LOGIN_FAIL:
      return {
        ...state,
        sending_login: false,
        message: {
          login_success: false,
        },
      };
    case AuthActionTypes.SENDING_REGISTER:
      return { ...state, sending_register: true };
    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        sending_register: false,
        message: {
          register_success: true,
        },
      };
    case AuthActionTypes.REGISTER_FAIL:
      return {
        ...state,
        sending_register: false,
        message: {
          register_success: true,
        },
      };
    case AuthActionTypes.RESET_AUTH:
      return { ...initialState };
    default:
      return state;
  }
};

export default AuthReducer;
