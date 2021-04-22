export const UserTypes = {
  GET_USER: 'user/GET_USER_INFO',
  GET_USER_COMPLETE: 'user/GET_USER_COMPLETE',
  RESET_USER: 'user/RESET_USER',
};

export interface UserState {
  role: string;

  isAuthenticated: boolean;
  permission: [];
  user: {
    loading: boolean;
    info: any;
  };
}

export interface UserPayload {
  user?: any;
}

export interface UserAction {
  type: typeof UserTypes.GET_USER | typeof UserTypes.GET_USER_COMPLETE;
  payload?: UserPayload;
}
