import { Reducer } from 'redux';
import { UserAction, UserState, UserTypes } from './types';

const initialState: UserState = {
  role: {
    loading: false,
    name: '',
  },
  isAuthenticated: false,
  permission: [],
  user: {
    loading: false,
    info: null,
  },
};
const Reducer: Reducer<UserState, UserAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UserTypes.GET_USER:
      return { ...state, user: { ...state.user, loading: true } };
    case UserTypes.GET_USER_COMPLETE:
      return {
        ...state,
        user: { ...state.user, loading: false, info: action.payload?.user },
      };
    case UserTypes.GET_USER_ROLE:
      return { ...state, role: { ...state.role, loading: true } };
    case UserTypes.GET_USER_ROLE_COMPLETE:
      return {
        ...state,
        role: { ...state.role, loading: false, name: action.payload?.role },
      };
    default:
      return state;
  }
};
export default Reducer;
