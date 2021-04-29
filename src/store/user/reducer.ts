import { Reducer } from 'redux';
import { UserAction, UserState, UserTypes } from './types';

const initialState: UserState = {
  role: {
    id: '',
    name: '',
  },
  isAuthenticated: false,
  permissions: {
    methods: [],
    routes: [],
  },
  user: {
    loading: false,
    info: null,
  },
};
const UserReducer: Reducer<UserState, UserAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UserTypes.GET_USER:
      return { ...state, user: { ...state.user, loading: true } };
    case UserTypes.GET_USER_COMPLETE:
      return {
        ...state,
        role: {
          id: action.payload?.user.role as string,
          name: action.payload?.role as string,
        },

        permissions: {
          routes: action.payload?.routes as string[],
          methods: action.payload?.methods as string[],
        },
        user: { ...state.user, loading: false, info: action.payload?.user },
      };
    case UserTypes.RESET_USER:
      return { ...initialState };
    default:
      return state;
  }
};
export default UserReducer;
