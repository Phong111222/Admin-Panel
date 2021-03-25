export const AuthActionTypes = {
  SENDING_LOGIN: 'SENDING_LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
};

export interface AuthState {
  sending_login?: boolean;
  sending_register?: boolean;
  message?: any;
}
export interface AuthPayload {
  login?: {
    email: string;
    password: string;
  };
}

export interface AuthActions {
  type:
    | typeof AuthActionTypes.LOGIN_FAIL
    | typeof AuthActionTypes.LOGIN_SUCCESS
    | typeof AuthActionTypes.SENDING_LOGIN;
  payload?: AuthPayload;
}
