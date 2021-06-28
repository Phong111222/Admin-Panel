export const UserTypes = {
  GET_USER: 'user/GET_USER_INFO',
  GET_USER_COMPLETE: 'user/GET_USER_COMPLETE',
  RESET_USER: 'user/RESET_USER',
  GET_USER_LIST: 'user/GET_USER_LIST',
  GET_USER_LIST_SUCCESS: 'user/GET_USER_LIST_SUCCESS',
  GET_USER_LIST_FAIL: 'user/GET_USER_LIST_FAIL',
  CREATE_USER: 'user/CREATE_USER',
  CREATE_USER_SUCCESS: 'user/CREATE_USER_SUCCESS',
  CREATE_USER_FAIL: 'user/CREATE_USER_FAIL',
};

export interface UserType {
  _id: string;
  isActive: boolean;
  fullname: string;
  email: string;
  role: string;
  createdAt: any;
  updatedAt: any;
}
export interface UserState {
  loading: boolean;
  list: UserType[];
  role: {
    id: string;
    name: string;
  };

  isAuthenticated: boolean;
  permissions: {
    methods: string[];
    routes: string[];
  };
  user: {
    info: UserType;
  };
  error: any;
}

export interface UserPayload {
  user?: any;
  methods?: string[];
  routes?: string[];
  role?: string;
  newUser?: UserType;
  list?: UserType[];
  error?: any;
}

export interface UserAction {
  type: typeof UserTypes.GET_USER | typeof UserTypes.GET_USER_COMPLETE;
  payload?: UserPayload;
}
