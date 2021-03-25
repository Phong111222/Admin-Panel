import { Reducer } from 'redux';
import { AuthActions, AuthActionTypes, AuthState } from './types';

const AuthReducer: Reducer<AuthState, AuthActions> = (
  state = {
    sending_login: false,
    sending_register: false,
    message: '',
  },
  action
) => {
  switch (action.type) {
    case AuthActionTypes.SENDING_LOGIN:
      return { ...state, sending_login: true };
    case AuthActionTypes.LOGIN_SUCCESS:
      return { ...state, sending_login: false };
    default:
      return state;
  }
};

export default AuthReducer;
