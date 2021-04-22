export const AuthActionTypes = {
  SENDING_LOGIN: 'SENDING_LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',

  SENDING_REGISTER: 'SENDING_REGISTER',
  REGISTER_FAIL: 'REGISTER_FAIL',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  RESET_AUTH: 'RESET_AUTH',
};

export interface AuthState {
  sending_login?: boolean;
  sending_register?: boolean;
  message?: {
    login_success?: boolean;
    register_success?: boolean;
  };
}
export interface AuthPayload {
  login?: {
    success: boolean;
  };
  register?: {
    success: boolean;
  };
}

export interface AuthActions {
  type:
    | typeof AuthActionTypes.LOGIN_FAIL
    | typeof AuthActionTypes.LOGIN_SUCCESS
    | typeof AuthActionTypes.SENDING_LOGIN
    | typeof AuthActionTypes.SENDING_REGISTER
    | typeof AuthActionTypes.REGISTER_FAIL
    | typeof AuthActionTypes.REGISTER_SUCCESS;
  payload?: AuthPayload;
}
