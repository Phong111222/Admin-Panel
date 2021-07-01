import { Reducer } from 'redux';
import { UserAction, UserState, UserType, UserTypes } from './types';

const initialState: UserState = {
  loading: false,
  role: {
    id: '',
    name: '',
  },
  isAuthenticated: false,
  permissions: {
    methods: [],
    routes: [],
  },
  list: [],
  user: {
    info: {
      _id: '',
      fullname: '',
      email: '',
      isActive: false,
      role: '',
      createdAt: null,
      updatedAt: null,
    },
  },
  error: null,
};
const UserReducer: Reducer<UserState, UserAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UserTypes.GET_USER:
      return { ...state, loading: true, user: { ...state.user } };
    case UserTypes.GET_USER_COMPLETE: {
      const user = action.payload?.user as UserType;
      return {
        ...state,
        loading: false,
        role: {
          id: user?.role as string,
          name: action.payload?.role as string,
        },

        permissions: {
          routes: action.payload?.routes as string[],
          methods: action.payload?.methods as string[],
        },
        user: { ...state.user, info: action.payload?.user as UserType },
      };
    }
    case UserTypes.CREATE_USER:
      return { ...state, loading: true };
    case UserTypes.CREATE_USER_SUCCESS: {
      const newList = [...state.list];
      newList.push(action.payload?.newUser as UserType);
      return { ...state, loading: false, list: newList };
    }
    case UserTypes.CREATE_USER_FAIL:
      return { ...state, loading: false, error: action.payload?.error };
    case UserTypes.GET_USER_LIST:
      return { ...state, loading: true };
    case UserTypes.GET_USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload?.list as UserType[],
      };
    case UserTypes.GET_USER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload?.error };
    case UserTypes.TOGGLE_USER: {
      const newList = state.list.map((user) =>
        user._id === action.payload?.userID
          ? { ...user, isActive: !user.isActive }
          : user
      );
      return {
        ...state,
        list: [...newList],
      };
    }
    case UserTypes.RESET_USER:
      return { ...initialState };

    default:
      return state;
  }
};
export default UserReducer;
