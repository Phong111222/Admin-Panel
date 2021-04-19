export const UserTypes = {
  ADD_STAFF: 'user/ADD_STAFF',
  GET_USER: 'user/GET_USER_INFO',
  GET_USER_COMPLETE: 'user/GET_USER_COMPLETE',
  GET_USER_ROLE: 'user/GET_USER_ROLE',
  GET_USER_ROLE_COMPLETE: 'user/GET_USER_ROLE_COMPLETE',
};

export interface UserState {
  role: {
    loading: boolean;
    name: string;
  };
  isAuthenticated: boolean;
  permission: [];
  user: {
    loading: boolean;
    info: any;
  };
}

export interface UserPayload {
  role?: any;
  user?: any;
}

export interface UserAction {
  type:
    | typeof UserTypes.ADD_STAFF
    | typeof UserTypes.GET_USER
    | typeof UserTypes.GET_USER_ROLE
    | typeof UserTypes.GET_USER_COMPLETE;
  payload?: UserPayload;
}
