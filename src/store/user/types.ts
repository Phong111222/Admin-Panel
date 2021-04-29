export const UserTypes = {
  GET_USER: 'user/GET_USER_INFO',
  GET_USER_COMPLETE: 'user/GET_USER_COMPLETE',
  RESET_USER: 'user/RESET_USER',
};

export interface UserState {
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
    loading: boolean;
    info: any;
  };
}

export interface UserPayload {
  user?: any;
  methods?: string[];
  routes?: string[];
  role?: string;
}

export interface UserAction {
  type: typeof UserTypes.GET_USER | typeof UserTypes.GET_USER_COMPLETE;
  payload?: UserPayload;
}
